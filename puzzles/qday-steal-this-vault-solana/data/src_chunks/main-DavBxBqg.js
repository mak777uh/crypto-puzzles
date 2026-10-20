var e=`//! Bunker integration tests (LiteSVM). One test binary so the LMS keys (built once per
//! process, ~1M hashes each) are shared by every test.
//!
//! Build the program first, then run in release (key generation is slow in debug):
//!   anchor build            # or: cargo build-sbf --manifest-path programs/bunker/Cargo.toml
//!   cargo test -p bunker --release
#![allow(
    clippy::result_large_err,
    clippy::too_many_arguments,
    clippy::type_complexity,
    clippy::cloned_ref_to_slice_refs
)]

mod assets;
mod attacks;
mod cluster;
mod common;
mod happy;
mod legacy;
mod measure;
mod regressions;
`;export{e as default};