# Methodology note — a silent tail race in producer/consumer sweep harnesses

Offered because every exhaustion claim in this folder rests on a harness
enumerating exactly the space it says it did, and this bug class makes a
harness under-report coverage without failing, without erroring, and without
losing a witness.

## The pattern

A sweep pipeline that feeds a bounded consumer from a process pool typically
looks like this:

```python
def submit():
    for u in units():
        sem.acquire()
        pool.apply_async(work, (u,), callback=q.put)
    q.put(None)              # <-- the bug

def consume():
    while True:
        item = q.get()
        if item is None:
            break            # <-- exits with results still in flight
        sem.release()
        ...
```

`apply_async` returns immediately. When the submit loop ends, up to
`INFLIGHT` callbacks have not fired yet. The sentinel is queued straight
away, the consumer sees it, and those results land behind it and are
discarded. The run then reports a clean total and a clean witness count.

## Why it is hard to notice

The loss is at the tail, bounded by the in-flight limit, so it is a small
fraction of a large run. Witnesses do not catch it: they are injected into
batches that have already been consumed. Progress counters do not catch it:
they count what was consumed, not what was submitted. In a measured run here
the loss was 17,738 of 123,836,734 candidates, 0.014 percent — invisible
unless the total is reconciled against a closed form.

A timing-sensitive reproduction with sleeping workers lost up to **4.75
percent** on the same code path. The magnitude depends on worker duration
relative to consumer drain rate, so a slower-per-unit sweep loses more.

## The fix

Make the sentinel mean "no more will be submitted", and have the consumer
stop only once it has seen that many results:

```python
state = {"submitted": None}

def submit():
    n = 0
    for u in units():
        sem.acquire()
        pool.apply_async(work, (u,), callback=q.put)
        n += 1
    state["submitted"] = n
    q.put(None)

def consume():
    seen, closed = 0, False
    while True:
        item = q.get()
        if item is None:
            closed = True
        else:
            seen += 1; sem.release(); ...
        if closed and state["submitted"] is not None and seen >= state["submitted"]:
            break
```

## Two related defects found alongside it

**Witness injection that overwrites.** `batch[0] = witness` destroys a real
candidate once per batch. Over 7,557 batches that silently skipped 7,557
candidates. Use `batch.insert(0, witness)` and size the batch to `BATCH-1`.

**Enum errors that truncate.** `if isinstance(item, Exception): break` ends
the run early on a single worker exception and still prints a total. Count
errors and report them instead.

## Recommended check

Report, at the end of every run: units submitted, units completed, worker
errors, and real candidates separately from injected witnesses. Reconcile the
real-candidate count against the closed form. After these fixes a 1.077x10^10
sweep reconciled to **-0.0007 percent**, and a 1.238x10^8 sweep to **4
candidates** out of 123,836,734 — the residue being the final partial batch.
Before them, the same space came up 25,295 short.
