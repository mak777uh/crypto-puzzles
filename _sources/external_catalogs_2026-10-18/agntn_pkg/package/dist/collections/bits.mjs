import { PartyKind, bits as bits$1, claim, compressed, confirmation, fact, funding, hex, increase, official, party, profile, pubkeyReveal, sweep, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NumericCollection } from "../_chunks/collection.mjs";
const bits1 = puzzle({
	id: "bits/1",
	chain: "bitcoin",
	address: "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2013-01-09 11:59:15",
	status: Status.Solved,
	pubkey: compressed("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000001", 1).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn"),
	prize: .001,
	solvedAt: "2013-01-10 02:54:44",
	solveTime: 53729,
	preGenesis: true,
	transactions: [funding("9223da07e858c6f153fbb8a24db52374ca19d2639098207c71710610cfda808e", "2013-01-09 11:59:15", .03), claim("3da9b8e4a9c056b22d4fd09784402fd1caab1ecf621ba074efc20dc03ff04277", "2013-01-10 02:54:44", .03)]
});
const bits2 = puzzle({
	id: "bits/2",
	chain: "bitcoin",
	address: "1CUNEBjYrCn2y1SdiUMohaKUi4wpP326Lb",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2014-07-29 21:53:54",
	status: Status.Solved,
	pubkey: compressed("02f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000003", 2).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU74sHUHy8S"),
	prize: .002,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 14674400,
	preGenesis: true,
	transactions: [
		funding("9294c9d71d9da40bc4344b5755e7652789df3bc1a9f660e040725216361d1c54", "2014-07-29 21:53:54", 1e-4),
		pubkeyReveal("30ab16d9eb2777caa6d4734d620d618fc797f62b3f7a167b97b0edc0e0cf8973", "2014-07-29 21:53:54", 1e-4),
		increase("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .002),
		claim("4feb64593f6bd3ebc05906db6aeb7f6c9beb65a970d97b48c64fb4653774d79e", "2015-01-15 18:07:14", .002)
	]
});
const bits3 = puzzle({
	id: "bits/3",
	chain: "bitcoin",
	address: "19ZewH8Kk1PDbSNdJ97FP4EiCjTRaZMZQA",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("025cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000007", 3).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU76rnZwVdz"),
	prize: .003,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .003), claim("fa1b9a669a7c16f1d0b15cfb57e9830ccee36db984bd074de450e47088c8d078", "2015-01-15 18:07:14", .003)]
});
const bits4 = puzzle({
	id: "bits/4",
	chain: "bitcoin",
	address: "1EhqbyUMvvs7BfL8goY6qcPbD6YKfPqb7e",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("022f01e5e15cca351daff3843fb70f3c2f0a1bdd05e5af888a67784ef3e10a2a01"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000008", 4).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU77MfhviY5"),
	prize: .004,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .004), claim("7c4f3c3022a956e7ad80bd0d3642f7e2e0a3dd4b275b7241cf1963610250d65b", "2015-01-15 18:07:14", .004)]
});
const bits5 = puzzle({
	id: "bits/5",
	chain: "bitcoin",
	address: "1E6NuFjCi27W5zoXg8TRdcSRq84zJeBW3k",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000015", 5).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU7Dq8Au4Pv"),
	prize: .005,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .005), claim("4f5a32521f352d48cc4491c6de3485764997c0cd089f63e822f4e7ed05015d20", "2015-01-15 18:07:14", .005)]
});
const bits6 = puzzle({
	id: "bits/6",
	chain: "bitcoin",
	address: "1PitScNLyp2HCygzadCh7FveTnfmpPbfp8",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000031", 6).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU7Tmu6qHxS"),
	prize: .006,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .006), claim("aa75e831a27d71dae09a5feeb7fec041ba0a55d1e9c3ac1d32ce88852dcedaa3", "2015-01-15 18:07:14", .006)]
});
const bits7 = puzzle({
	id: "bits/7",
	chain: "bitcoin",
	address: "1McVt1vMtCC7yn5b9wgX1833yCcLXzueeC",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0296516a8f65774275278d0d7420a88df0ac44bd64c7bae07c3fe397c5b3300b23"),
	key: hex("000000000000000000000000000000000000000000000000000000000000004c", 7).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU7hDgvu64y"),
	prize: .007,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .007), claim("09817b72199818d5610d44f9427f87c84ef3905004b751c5198059188e2de9b4", "2015-01-15 18:07:14", .007)]
});
const bits8 = puzzle({
	id: "bits/8",
	chain: "bitcoin",
	address: "1M92tSqNmQLYw33fuBvjmeadirh1ysMBxK",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0308bc89c2f919ed158885c35600844d49890905c79b357322609c45706ce6b514"),
	key: hex("00000000000000000000000000000000000000000000000000000000000000e0", 8).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU8xvGK1zpm"),
	prize: .008,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .008), claim("0827fb603364998f7f24724e2f4f4befd6ada60dbef28f91307fe7a79e98a4f8", "2015-01-15 18:07:14", .008)]
});
const bits9 = puzzle({
	id: "bits/9",
	chain: "bitcoin",
	address: "1CQFwcjw1dwhtkVWBttNLDtqL7ivBonGPV",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0243601d61c836387485e9514ab5c8924dd2cfd466af34ac95002727e1659d60f7"),
	key: hex("00000000000000000000000000000000000000000000000000000000000001d3", 9).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFUB3vfDKcxZ"),
	prize: .009,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .009), claim("49647889152f4f444e6007e94d59f24003e9f012687efbd7bc273c26371c3aba", "2015-01-15 18:07:14", .009)]
});
const bits10 = puzzle({
	id: "bits/10",
	chain: "bitcoin",
	address: "1LeBZP5QCwwgXRtmVUvTVrraqPUokyLHqe",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03a7a4c30291ac1db24b4ab00c442aa832f7794b5a0959bec6e8d7fee802289dcd"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000202", 10).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFUBTL67V6dE"),
	prize: .01,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .01), claim("b70f19f2581acf4320cf069379982f2df6f9c8b8ef91ed59279e32453a81ad62", "2015-01-15 18:07:14", .01)]
});
const bits11 = puzzle({
	id: "bits/11",
	chain: "bitcoin",
	address: "1PgQVLmst3Z314JrQn5TNiys8Hc38TcXJu",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("038b05b0603abd75b0c57489e451f811e1afe54a8715045cdf4888333f3ebc6e8b"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000483", 11).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFUGxXgtm63M"),
	prize: .011,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .011), claim("5c2f4fc31a359f72a363488496365eff2e8eed1b59e4e6dc240d5b8dfa740376", "2015-01-15 18:07:14", .011)]
});
const bits12 = puzzle({
	id: "bits/12",
	chain: "bitcoin",
	address: "1DBaumZxUkM4qMQRt2LVWyFJq5kDtSZQot",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("038b00fcbfc1a203f44bf123fc7f4c91c10a85c8eae9187f9d22242b4600ce781c"),
	key: hex("0000000000000000000000000000000000000000000000000000000000000a7b", 12).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFUW5RtS2JN1"),
	prize: .012,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .012), claim("5bf0a6d4af73ac148a5b1d26c82d4c7567f45f868f427b48efad7cae08fb22df", "2015-01-15 18:07:14", .012)]
});
const bits13 = puzzle({
	id: "bits/13",
	chain: "bitcoin",
	address: "1Pie8JkxBT6MGPz9Nvi3fsPkr2D8q3GBc1",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03aadaaab1db8d5d450b511789c37e7cfeb0eb8b3e61a57a34166c5edc9a4b869d"),
	key: hex("0000000000000000000000000000000000000000000000000000000000001460", 13).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFUspniiQZds"),
	prize: .013,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .013), claim("2686aca4a211031b75396dbb9baecadfc01a1534d8682c8eacd307ab2c8f47e0", "2015-01-15 18:07:14", .013)]
});
const bits14 = puzzle({
	id: "bits/14",
	chain: "bitcoin",
	address: "1ErZWg5cFCe4Vw5BzgfzB74VNLaXEiEkhk",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03b4f1de58b8b41afe9fd4e5ffbdafaeab86c5db4769c15d6e6011ae7351e54759"),
	key: hex("0000000000000000000000000000000000000000000000000000000000002930", 14).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFVfZyiN5iEG"),
	prize: .014,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .014), claim("c0d88c38111f54c86e2f5f1921c8dedd6b8ca6052baf496010ab755dcece5b46", "2015-01-15 18:07:14", .014)]
});
const bits15 = puzzle({
	id: "bits/15",
	chain: "bitcoin",
	address: "1QCbW9HWnwQWiQqVo5exhAnmfqKRrCRsvW",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02fea58ffcf49566f6e9e9350cf5bca2861312f422966e8db16094beb14dc3df2c"),
	key: hex("00000000000000000000000000000000000000000000000000000000000068f3", 15).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFY5iMZbuRxj"),
	prize: .015,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .015), claim("b82f780d5619131a0f98eb0bcfc2f01ce4b3997bc0066d9498b22073c163f4cf", "2015-01-15 18:07:14", .015)]
});
const bits16 = puzzle({
	id: "bits/16",
	chain: "bitcoin",
	address: "1BDyrQ6WoF8VN3g9SAS1iKZcPzFfnDVieY",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("029d8c5d35231d75eb87fd2c5f05f65281ed9573dc41853288c62ee94eb2590b7a"),
	key: hex("000000000000000000000000000000000000000000000000000000000000c936", 16).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFbjHrFMWzJp"),
	prize: .016,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .016), claim("4d102a549127e6fcdc4f6b4820a2c99eeba71af9fc0d6e79f43571f192bd09c8", "2015-01-15 18:07:14", .016)]
});
const bits17 = puzzle({
	id: "bits/17",
	chain: "bitcoin",
	address: "1HduPEXZRdG26SUT5Yk83mLkPyjnZuJ7Bm",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("033f688bae8321b8e02b7e6c0a55c2515fb25ab97d85fda842449f7bfa04e128c3"),
	key: hex("000000000000000000000000000000000000000000000000000000000001764f", 17).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFiHkRsp99uC"),
	prize: .017,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .017), claim("e1818d951b51d4a0ed05f49b52e3300524bbdd03ad5d29bad15a1a09a5431e50", "2015-01-15 18:07:14", .017)]
});
const bits18 = puzzle({
	id: "bits/18",
	chain: "bitcoin",
	address: "1GnNTmTVLZiqQfLbAdp9DVdicEnB5GoERE",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("020ce4a3291b19d2e1a7bf73ee87d30a6bdbc72b20771e7dfff40d0db755cd4af1"),
	key: hex("000000000000000000000000000000000000000000000000000000000003080d", 18).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFyWkjT5fywW"),
	prize: .018,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .018), claim("f785502a72d26cd6b6d26da5d5b4917f2fc5b74e57d7a139f4b7c2275acf2b62", "2015-01-15 18:07:14", .018)]
});
const bits19 = puzzle({
	id: "bits/19",
	chain: "bitcoin",
	address: "1NWmZRpHH4XSPwsW6dsS3nrNWfL1yrJj4w",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0385663c8b2f90659e1ccab201694f4f8ec24b3749cfe5030c7c3646a709408e19"),
	key: hex("000000000000000000000000000000000000000000000000000000000005749f", 19).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rGP2jMrxCfX3"),
	prize: .019,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .019), claim("ea746998394eafff179098d4df6a9c7caf79b2583a316ac0948276edfc58ba43", "2015-01-15 18:07:14", .019)]
});
const bits20 = puzzle({
	id: "bits/20",
	chain: "bitcoin",
	address: "1HsMJxNiV7TLxmoF6uJNkydxPFDog4NQum",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("033c4a45cbd643ff97d77f41ea37e843648d50fd894b864b0d52febc62f6454f7c"),
	key: hex("00000000000000000000000000000000000000000000000000000000000d2c55", 20).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rHfuE2Tg4nJW"),
	prize: .02,
	solvedAt: "2015-01-15 18:07:14",
	solveTime: 0,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .02), claim("3121aba5b7cc4d766a1e1b937c456d299bd75c6f3059c82353a4918b714d66c4", "2015-01-15 18:07:14", .02)]
});
const bits21 = puzzle({
	id: "bits/21",
	chain: "bitcoin",
	address: "14oFNXucftsHiUMY8uctg6N487riuyXs4h",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("031a746c78f72754e0be046186df8a20cdce5c79b2eda76013c647af08d306e49e"),
	key: hex("00000000000000000000000000000000000000000000000000000000001ba534", 21).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rL6JJvw6XUry"),
	prize: .021,
	solvedAt: "2015-01-15 19:11:31",
	solveTime: 3857,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .021), claim("cfbfafab6e04041ad36fb2395c2dd384f943ebdf61910c799f8f4a87276b2914", "2015-01-15 19:11:31", .021)]
});
const bits22 = puzzle({
	id: "bits/22",
	chain: "bitcoin",
	address: "1CfZWK1QTQE3eS9qn61dQjV89KDjZzfNcv",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("023ed96b524db5ff4fe007ce730366052b7c511dc566227d929070b9ce917abb43"),
	key: hex("00000000000000000000000000000000000000000000000000000000002de40f", 22).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rP9Ja2dhtxoh"),
	prize: .022,
	solvedAt: "2015-01-15 22:15:25",
	solveTime: 14891,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .022), claim("0eb5b5c103e68eb0931430e7786cf1b6962f9eed5a2cb5271d4dd1699b77e86f", "2015-01-15 22:15:25", .022)]
});
const bits23 = puzzle({
	id: "bits/23",
	chain: "bitcoin",
	address: "1L2GM8eE7mJWLdo3HZS6su1832NX2txaac",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03f82710361b8b81bdedb16994f30c80db522450a93e8e87eeb07f7903cf28d04b"),
	key: hex("0000000000000000000000000000000000000000000000000000000000556e52", 23).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rVkthFNsQ6i7"),
	prize: .023,
	solvedAt: "2015-01-15 19:11:31",
	solveTime: 3857,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .023), claim("cfbfafab6e04041ad36fb2395c2dd384f943ebdf61910c799f8f4a87276b2914", "2015-01-15 19:11:31", .023)]
});
const bits24 = puzzle({
	id: "bits/24",
	chain: "bitcoin",
	address: "1rSnXMr63jdCuegJFuidJqWxUPV7AtUf7",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("036ea839d22847ee1dce3bfc5b11f6cf785b0682db58c35b63d1342eb221c3490c"),
	key: hex("0000000000000000000000000000000000000000000000000000000000dc2a04", 24).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rtHyNcFoApRd"),
	prize: .024,
	solvedAt: "2015-01-15 22:15:25",
	solveTime: 14891,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .024), claim("0eb5b5c103e68eb0931430e7786cf1b6962f9eed5a2cb5271d4dd1699b77e86f", "2015-01-15 22:15:25", .024)]
});
const bits25 = puzzle({
	id: "bits/25",
	chain: "bitcoin",
	address: "15JhYXn6Mx3oF4Y7PcTAv2wVVAuCFFQNiP",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03057fbea3a2623382628dde556b2a0698e32428d3cd225f3bd034dca82dd7455a"),
	key: hex("0000000000000000000000000000000000000000000000000000000001fa5ee5", 25).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7siAXycwkwRQg"),
	prize: .025,
	solvedAt: "2015-01-15 22:15:25",
	solveTime: 14891,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .025), claim("0eb5b5c103e68eb0931430e7786cf1b6962f9eed5a2cb5271d4dd1699b77e86f", "2015-01-15 22:15:25", .025)]
});
const bits26 = puzzle({
	id: "bits/26",
	chain: "bitcoin",
	address: "1JVnST957hGztonaWK6FougdtjxzHzRMMg",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("024e4f50a2a3eccdb368988ae37cd4b611697b26b29696e42e06d71368b4f3840f"),
	key: hex("000000000000000000000000000000000000000000000000000000000340326e", 26).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7tefTXkqGMNis"),
	prize: .026,
	solvedAt: "2015-01-15 22:15:25",
	solveTime: 14891,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .026), claim("0eb5b5c103e68eb0931430e7786cf1b6962f9eed5a2cb5271d4dd1699b77e86f", "2015-01-15 22:15:25", .026)]
});
const bits27 = puzzle({
	id: "bits/27",
	chain: "bitcoin",
	address: "128z5d7nN7PkCuX5qoA4Ys6pmxUYnEy86k",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("031a864bae3922f351f1b57cfdd827c25b7e093cb9c88a72c1cd893d9f90f44ece"),
	key: hex("0000000000000000000000000000000000000000000000000000000006ac3875", 27).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7wBBz2KJQdASx"),
	prize: .027,
	solvedAt: "2015-01-15 22:15:25",
	solveTime: 14891,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .027), claim("0eb5b5c103e68eb0931430e7786cf1b6962f9eed5a2cb5271d4dd1699b77e86f", "2015-01-15 22:15:25", .027)]
});
const bits28 = puzzle({
	id: "bits/28",
	chain: "bitcoin",
	address: "12jbtzBb54r97TCwW3G1gCFoumpckRAPdY",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03e9e661838a96a65331637e2a3e948dc0756e5009e7cb5c36664d9b72dd18c0a7"),
	key: hex("000000000000000000000000000000000000000000000000000000000d916ce8", 28).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M82GSgY8p5EkUe"),
	prize: .028,
	solvedAt: "2015-01-15 22:15:25",
	solveTime: 14891,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .028), claim("0eb5b5c103e68eb0931430e7786cf1b6962f9eed5a2cb5271d4dd1699b77e86f", "2015-01-15 22:15:25", .028)]
});
const bits29 = puzzle({
	id: "bits/29",
	chain: "bitcoin",
	address: "19EEC52krRUK1RkUAEZmQdjTyHT7Gp1TYT",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("026caad634382d34691e3bef43ed4a124d8909a8a3362f91f1d20abaaf7e917b36"),
	key: hex("0000000000000000000000000000000000000000000000000000000017e2551e", 29).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M89tAnjFUUDRtJ"),
	prize: .029,
	solvedAt: "2015-01-16 02:46:38",
	solveTime: 31164,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .029), claim("c9878a6de4f0d482020411aa870eb3f6ca04b3dd1b2cf3ac5cf1ae265196e269", "2015-01-16 02:46:38", .029)]
});
const bits30 = puzzle({
	id: "bits/30",
	chain: "bitcoin",
	address: "1LHtnpd8nU5VHEMkG2TMYYNUjjLc992bps",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("030d282cf2ff536d2c42f105d0b8588821a915dc3f9a05bd98bb23af67a2e92a5b"),
	key: hex("000000000000000000000000000000000000000000000000000000003d94cd64", 30).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M8diLSC5MyERoW"),
	prize: .03,
	solvedAt: "2015-01-16 13:31:58",
	solveTime: 69884,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .03), claim("7c08f94495f5773e65c50d7a0a03e366802de9ac4063ed79316d9eba332d0e9d", "2015-01-16 13:31:58", .03)]
});
const bits31 = puzzle({
	id: "bits/31",
	chain: "bitcoin",
	address: "1LhE6sCTuGae42Axu1L1ZB7L96yi9irEBE",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0387dc70db1806cd9a9a76637412ec11dd998be666584849b3185f7f9313c8fd28"),
	key: hex("000000000000000000000000000000000000000000000000000000007d4fe747", 31).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M9SmFMSCA4jQRW"),
	prize: .031,
	solvedAt: "2015-01-16 08:02:15",
	solveTime: 50101,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .031), claim("d482463d265ca83307f80ebcc2c3cb47b5b0e2347d08674ba0b7c2c6876155af", "2015-01-16 08:02:15", .031)]
});
const bits32 = puzzle({
	id: "bits/32",
	chain: "bitcoin",
	address: "1FRoHA9xewq7DjrZ1psWJVeTer8gHRqEvR",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0209c58240e50e3ba3f833c82655e8725c037a2294e14cf5d73a5df8d56159de69"),
	key: hex("00000000000000000000000000000000000000000000000000000000b862a62e", 32).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9MACNivtz8yMYTd"),
	prize: .032,
	solvedAt: "2015-01-16 04:57:19",
	solveTime: 39005,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .032), claim("919f5c226b8926d2203c6e1995738b7223b157740cb5c0fd33399860ded9866b", "2015-01-16 04:57:19", .032)]
});
const bits33 = puzzle({
	id: "bits/33",
	chain: "bitcoin",
	address: "187swFMjz1G54ycVU56B7jZFHFTNVQFDiu",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03a355aa5e2e09dd44bb46a4722e9336e9e3ee4ee4e7b7a0cf5785b283bf2ab579"),
	key: hex("00000000000000000000000000000000000000000000000000000001a96ca8d8", 33).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9MDGKrXXQL647jj"),
	prize: .033,
	solvedAt: "2015-01-16 16:43:28",
	solveTime: 81374,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .033), claim("718f7962432312acda2aeecdf18e94f5960f51013cc4d38134e7493c21e77baf", "2015-01-16 16:43:28", .033)]
});
const bits34 = puzzle({
	id: "bits/34",
	chain: "bitcoin",
	address: "1PWABE7oUahG2AFFQhhvViQovnCr4rEv7Q",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("033cdd9d6d97cbfe7c26f902faf6a435780fe652e159ec953650ec7b1004082790"),
	key: hex("000000000000000000000000000000000000000000000000000000034a65911d", 34).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9MJaAKqns7PN9Ra"),
	prize: .034,
	solvedAt: "2015-01-17 00:14:34",
	solveTime: 108440,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .034), claim("03da907c6b671764ee78fcca78e126c781640efb691d011f5aff0f09072a6104", "2015-01-17 00:14:34", .034)]
});
const bits35 = puzzle({
	id: "bits/35",
	chain: "bitcoin",
	address: "1PWCx5fovoEaoBowAvF5k91m2Xat9bMgwb",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02f6a8148a62320e149cb15c544fe8a25ab483a0095d2280d03b8a00a7feada13d"),
	key: hex("00000000000000000000000000000000000000000000000000000004aed21170", 35).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9MP7J9oTbu6KuRr"),
	prize: .035,
	solvedAt: "2015-01-17 07:33:27",
	solveTime: 134773,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .035), claim("9308722efdd45b5e4f6efbad73c9b0e5172bbc4db877a54d47b99caa31f08ab0", "2015-01-17 07:33:27", .035)]
});
const bits36 = puzzle({
	id: "bits/36",
	chain: "bitcoin",
	address: "1Be2UF9NLfyLFbtm3TCbmuocc9N1Kduci1",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02b3e772216695845fa9dda419fb5daca28154d8aa59ea302f05e916635e47b9f6"),
	key: hex("00000000000000000000000000000000000000000000000000000009de820a7c", 36).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9Mg1Upu7eJAtiDr"),
	prize: .036,
	solvedAt: "2015-01-17 17:14:40",
	solveTime: 169646,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .036), claim("ef14a1ad1e267ffa71c2d6d719e094a444a0fce6658b47132df7b7c1d95b95b2", "2015-01-17 17:14:40", .036)]
});
const bits37 = puzzle({
	id: "bits/37",
	chain: "bitcoin",
	address: "14iXhn8bGajVWegZHJ18vJLHhntcpL4dex",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("027d2c03c3ef0aec70f2c7e1e75454a5dfdd0e1adea670c1b3a4643c48ad0f1255"),
	key: hex("0000000000000000000000000000000000000000000000000000001757756a93", 37).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9NRuiZFAX6XciCX"),
	prize: .037,
	solvedAt: "2015-01-18 23:32:11",
	solveTime: 278697,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .037), claim("21552e7e7e07498972ebf6e3ef56d7fc91dadbc7af32790e36ca2eeb4fd575c5", "2015-01-18 23:32:11", .037)]
});
const bits38 = puzzle({
	id: "bits/38",
	chain: "bitcoin",
	address: "1HBtApAFA9B2YZw3G2YKSMCtb3dVnjuNe2",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03c060e1e3771cbeccb38e119c2414702f3f5181a89652538851d2e3886bdd70c6"),
	key: hex("00000000000000000000000000000000000000000000000000000022382facd0", 38).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9P3MahktLW5315v"),
	prize: .038,
	solvedAt: "2015-01-19 10:27:27",
	solveTime: 318013,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .038), claim("3def611be07c9e5866c9cf293fcb52ca132e56abcd8fa19130bd7a8d5d4b7c28", "2015-01-19 10:27:27", .038)]
});
const bits39 = puzzle({
	id: "bits/39",
	chain: "bitcoin",
	address: "122AJhKLEfkFBaGAd84pLp1kfE7xK3GdT8",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("022d77cd1467019a6bf28f7375d0949ce30e6b5815c2758b98a74c2700bc006543"),
	key: hex("0000000000000000000000000000000000000000000000000000004b5f8303e9", 39).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9RMTSCcQzX3EjMZ"),
	prize: .039,
	solvedAt: "2015-01-21 06:35:26",
	solveTime: 476892,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .039), claim("41abfd3419ec99b62c571c05a8183214c1ee21bc35acd0a2f24c4097c62b291f", "2015-01-21 06:35:26", .039)]
});
const bits40 = puzzle({
	id: "bits/40",
	chain: "bitcoin",
	address: "1EeAxcprB2PpCnr34VfZdFrkUWuxyiNEFv",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03a2efa402fd5268400c77c20e574ba86409ededee7c4020e4b9f0edbee53de0d4"),
	key: hex("000000000000000000000000000000000000000000000000000000e9ae4933d6", 40).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9aFJuCJDo5F6Jm7"),
	prize: .04,
	solvedAt: "2015-01-30 18:24:18",
	solveTime: 1297024,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .04), claim("26dbcd4f8bbd5007385fc79954ba238bc684c305d565c60146549bb5acc3f329", "2015-01-30 18:24:18", .04)]
});
const bits41 = puzzle({
	id: "bits/41",
	chain: "bitcoin",
	address: "1L5sU9qvJeuwQUdt4y1eiLmquFxKjtHr3E",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03b357e68437da273dcf995a474a524439faad86fc9effc300183f714b0903468b"),
	key: hex("00000000000000000000000000000000000000000000000000000153869acc5b", 41).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9gCD9CBomewdcUD"),
	prize: .041,
	solvedAt: "2015-01-30 18:24:18",
	solveTime: 1297024,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .041), claim("26dbcd4f8bbd5007385fc79954ba238bc684c305d565c60146549bb5acc3f329", "2015-01-30 18:24:18", .041)]
});
const bits42 = puzzle({
	id: "bits/42",
	chain: "bitcoin",
	address: "1E32GPWgDyeyQac4aJxm9HVoLrrEYPnM4N",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03eec88385be9da803a0d6579798d977a5d0c7f80917dab49cb73c9e3927142cb6"),
	key: hex("000000000000000000000000000000000000000000000000000002a221c58d8f", 42).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9zzYEemjCVJ3vo9"),
	prize: .042,
	solvedAt: "2015-01-30 18:24:18",
	solveTime: 1297024,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .042), claim("26dbcd4f8bbd5007385fc79954ba238bc684c305d565c60146549bb5acc3f329", "2015-01-30 18:24:18", .042)]
});
const bits43 = puzzle({
	id: "bits/43",
	chain: "bitcoin",
	address: "1PiFuqGpG8yGM5v6rNHWS3TjsG6awgEGA1",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02a631f9ba0f28511614904df80d7f97a4f43f02249c8909dac92276ccf0bcdaed"),
	key: hex("000000000000000000000000000000000000000000000000000006bd3b27c591", 43).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgdB23bP5LsYN8Krv7"),
	prize: .043,
	solvedAt: "2015-01-30 18:24:18",
	solveTime: 1297024,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .043), claim("26dbcd4f8bbd5007385fc79954ba238bc684c305d565c60146549bb5acc3f329", "2015-01-30 18:24:18", .043)]
});
const bits44 = puzzle({
	id: "bits/44",
	chain: "bitcoin",
	address: "1CkR2uS7LmFwc3T2jV8C1BhWb5mQaoxedF",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("025e466e97ed0e7910d3d90ceb0332df48ddf67d456b9e7303b50a3d89de357336"),
	key: hex("00000000000000000000000000000000000000000000000000000e02b35a358f", 44).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgdCpdGyxm7PWoNQdr"),
	prize: .044,
	solvedAt: "2015-01-30 18:24:18",
	solveTime: 1297024,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .044), claim("26dbcd4f8bbd5007385fc79954ba238bc684c305d565c60146549bb5acc3f329", "2015-01-30 18:24:18", .044)]
});
const bits45 = puzzle({
	id: "bits/45",
	chain: "bitcoin",
	address: "1NtiLNGegHWE3Mp9g2JPkgx6wUg4TW7bbk",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("026ecabd2d22fdb737be21975ce9a694e108eb94f3649c586cc7461c8abf5da71a"),
	key: hex("0000000000000000000000000000000000000000000000000000122fca143c05", 45).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgdDrgx63tbte4scLA"),
	prize: .045,
	solvedAt: "2015-01-30 18:24:18",
	solveTime: 1297024,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .045), claim("26dbcd4f8bbd5007385fc79954ba238bc684c305d565c60146549bb5acc3f329", "2015-01-30 18:24:18", .045)]
});
const bits46 = puzzle({
	id: "bits/46",
	chain: "bitcoin",
	address: "1F3JRMWudBaj48EhwcHDdpeuy2jwACNxjP",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03fd5487722d2576cb6d7081426b66a3e2986c1ce8358d479063fb5f2bb6dd5849"),
	key: hex("00000000000000000000000000000000000000000000000000002ec18388d544", 46).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgdLwb42sQhwTBJDnG"),
	prize: .046,
	solvedAt: "2015-01-30 21:04:12",
	solveTime: 1306618,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .046), claim("ff02b5d1efe2c95c6efadae4384eb7fb654e64b8bef2cbeb3d45774665555504", "2015-01-30 21:04:12", .046)]
});
const bits47 = puzzle({
	id: "bits/47",
	chain: "bitcoin",
	address: "1Pd8VvT49sHKsmqrQiP61RsVwmXCZ6ay7Z",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("023a12bd3caf0b0f77bf4eea8e7a40dbe27932bf80b19ac72f5f5a64925a594196"),
	key: hex("00000000000000000000000000000000000000000000000000006cd610b53cba", 47).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgdcLTenJYVVVTRzxN"),
	prize: .047,
	solvedAt: "2015-09-01 20:20:24",
	solveTime: 19793590,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .047), claim("39553513f731ae20f98f3307e863f0aecee9842f22273bb2ddfc0fb6ba481c5e", "2015-09-01 20:20:24", .047)]
});
const bits48 = puzzle({
	id: "bits/48",
	chain: "bitcoin",
	address: "1DFYhaB2J9q1LLZJWKTnscPWos9VBqDHzv",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0291bee5cf4b14c291c650732faa166040e4c18a14731f9a930c1e87d3ec12debb"),
	key: hex("0000000000000000000000000000000000000000000000000000ade6d7ce3b9b", 48).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgdtUGWxHzvDi28MfR"),
	prize: .048,
	solvedAt: "2015-09-01 20:20:24",
	solveTime: 19793590,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .048), claim("39553513f731ae20f98f3307e863f0aecee9842f22273bb2ddfc0fb6ba481c5e", "2015-09-01 20:20:24", .048)]
});
const bits49 = puzzle({
	id: "bits/49",
	chain: "bitcoin",
	address: "12CiUhYVTTH33w3SPUBqcpMoqnApAV4WCF",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02591d682c3da4a2a698633bf5751738b67c343285ebdc3492645cb44658911484"),
	key: hex("000000000000000000000000000000000000000000000000000174176b015f4d", 49).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgejcjwprJ4MAYLw8e"),
	prize: .049,
	solvedAt: "2015-09-01 20:20:24",
	solveTime: 19793590,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .049), claim("39553513f731ae20f98f3307e863f0aecee9842f22273bb2ddfc0fb6ba481c5e", "2015-09-01 20:20:24", .049)]
});
const bits50 = puzzle({
	id: "bits/50",
	chain: "bitcoin",
	address: "1MEzite4ReNuWaL5Ds17ePKt2dCxWEofwk",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03f46f41027bbf44fafd6b059091b900dad41e6845b2241dc3254c7cdd3c5a16c6"),
	key: hex("00000000000000000000000000000000000000000000000000022bd43c2e9354", 50).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgfXBMYdNVA4EjUMzg"),
	prize: .05,
	solvedAt: "2015-09-01 20:20:24",
	solveTime: 19793590,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .05), claim("39553513f731ae20f98f3307e863f0aecee9842f22273bb2ddfc0fb6ba481c5e", "2015-09-01 20:20:24", .05)]
});
const bits51 = puzzle({
	id: "bits/51",
	chain: "bitcoin",
	address: "1NpnQyZ7x24ud82b7WiRNvPm6N8bqGQnaS",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("028c6c67bef9e9eebe6a513272e50c230f0f91ed560c37bc9b033241ff6c3be78f"),
	key: hex("00000000000000000000000000000000000000000000000000075070a1a009d4", 51).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgm9fa43QnU2CpULaK"),
	prize: .051,
	solvedAt: "2017-04-05 10:11:20",
	solveTime: 70041846,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .051), claim("70ee9ab241829a6f49ebf9f109e97f6e466d938e558bade1c5fe341310bc356e", "2017-04-05 10:11:20", .051)]
});
const bits52 = puzzle({
	id: "bits/52",
	chain: "bitcoin",
	address: "15z9c9sVpu6fwNiK7dMAFgMYSK4GqsGZim",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0374c33bd548ef02667d61341892134fcf216640bc2201ae61928cd0874f6314a7"),
	key: hex("000000000000000000000000000000000000000000000000000efae164cb9e3c", 52).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjguYJTZsntce5oQQrh"),
	prize: .052,
	solvedAt: "2017-04-21 18:10:05",
	solveTime: 71452971,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .052), claim("b0df330141225a2253c375b7b6c36c0016a9633934295916df6b0fd31afb4a8b", "2017-04-21 18:10:05", .052)]
});
const bits53 = puzzle({
	id: "bits/53",
	chain: "bitcoin",
	address: "15K1YKJMiJ4fpesTVUcByoz334rHmknxmT",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("020faaf5f3afe58300a335874c80681cf66933e2a7aeb28387c0d28bb048bc6349"),
	key: hex("00000000000000000000000000000000000000000000000000180788e47e326c", 53).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjh5SmqrUoK2mhwSYFV"),
	prize: .53,
	solvedAt: "2017-09-04 20:23:27",
	solveTime: 83211373,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .053),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .477),
		claim("0e343c3640fa8cc1f7a97556255f46a08b89bd7d1b62ca94b86b37e51835b3b3", "2017-09-04 20:23:27", .53)
	]
});
const bits54 = puzzle({
	id: "bits/54",
	chain: "bitcoin",
	address: "1KYUv7nSvXx4642TKeuC2SNdTk326uUpFy",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("034af4b81f8c450c2c870ce1df184aff1297e5fcd54944d98d81e1a545ffb22596"),
	key: hex("00000000000000000000000000000000000000000000000000236fb6d5ad1f43", 54).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjhHvuTMSDchRp5hktc"),
	prize: .54,
	solvedAt: "2017-11-16 11:04:22",
	solveTime: 89485028,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .054),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .486),
		claim("02e9c6ccae985a6485e633b56a084dae2a32736e5b866c3b9622db9d3c57078f", "2017-11-16 11:04:22", .54)
	]
});
const bits55 = puzzle({
	id: "bits/55",
	chain: "bitcoin",
	address: "1LzhS3k3e9Ub8i2W1V8xQFdB8n2MYCHPCa",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0385a30d8413af4f8f9e6312400f2d194fe14f02e719b24c3f83bf1fd233a8f963"),
	key: hex("000000000000000000000000000000000000000000000000006abe1f9b67e114", 55).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjidyYKE5NcJQZYvknA"),
	prize: .55,
	solvedAt: "2018-05-29 08:13:52",
	solveTime: 106236398,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .055),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .495),
		increase("0cec4460b09db31a00ff1475c32b6a02a89fde2ff89d8ff8fd79535a21474d90", "2018-03-11 04:50:13", 11515e-8),
		claim("ecc8c09284a6f9e6d52cccf7f8f4aef1d0c4a33984375dea4cea70923066078d", "2018-05-29 08:13:52", .55011515)
	]
});
const bits56 = puzzle({
	id: "bits/56",
	chain: "bitcoin",
	address: "17aPYR1m6pVAacXg1PTDDU7XafvK1dxvhi",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("033f2db2074e3217b3e5ee305301eeebb1160c4fa1e993ee280112f6348637999a"),
	key: hex("000000000000000000000000000000000000000000000000009d18b63ac4ffdf", 56).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjjb65nDHeqyjiBaJXv"),
	prize: .56,
	solvedAt: "2018-09-08 05:45:09",
	solveTime: 115040275,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .056),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .504),
		claim("5317fdbea32034f8f983bd2324e99e5da593aaf3c4aed6425d8104dc3b8c77d2", "2018-09-08 05:45:09", .504)
	]
});
const bits57 = puzzle({
	id: "bits/57",
	chain: "bitcoin",
	address: "15c9mPGLku1HuW9LRtBf4jcHVpBUt8txKz",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02a521a07e98f78b03fc1e039bc3a51408cd73119b5eb116e583fe57dc8db07aea"),
	key: hex("00000000000000000000000000000000000000000000000001eb25c90795d61c", 57).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjqtiAvYTJzYEmqup7b"),
	prize: .57,
	solvedAt: "2018-11-08 01:03:19",
	solveTime: 120293765,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .057),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .513),
		claim("fd773819f5fb5d672d32bfe99e30af086e86c2c2b35dd7cfe337bf8960a96aa7", "2018-11-08 01:03:19", .57)
	]
});
const bits58 = puzzle({
	id: "bits/58",
	chain: "bitcoin",
	address: "1Dn8NF8qDyyfHMktmuoQLGyjWmZXgvosXf",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0311569442e870326ceec0de24eb5478c19e146ecd9d15e4666440f2f638875f42"),
	key: hex("00000000000000000000000000000000000000000000000002c675b852189a21", 58).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjv2kTamEYQT9BNC7o1"),
	prize: .58,
	solvedAt: "2018-12-03 06:03:22",
	solveTime: 122471768,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .058),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .522),
		claim("17d31de2bd300bc1bad430ec0db77ca27466bbb97bf03df6a3ff386d60e58996", "2018-12-03 06:03:22", .58)
	]
});
const bits59 = puzzle({
	id: "bits/59",
	chain: "bitcoin",
	address: "1HAX2n9Uruu9YDt4cqRgYcvtGvZj1rbUyt",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0241267d2d7ee1a8e76f8d1546d0d30aefb2892d231cee0dde7776daf9f8021485"),
	key: hex("00000000000000000000000000000000000000000000000007496cbb87cab44f", 59).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYkHpsTBP19HvTFqiU6i"),
	prize: .59,
	solvedAt: "2019-02-11 22:39:32",
	solveTime: 128579538,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .059),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .531),
		claim("66cd4fd4b240df28c5f61c4c86865f57e5f4e203dc8ea36d520e553e61d96e04", "2019-02-11 22:39:32", .59)
	]
});
const bits60 = puzzle({
	id: "bits/60",
	chain: "bitcoin",
	address: "1Kn5h2qpgw9mWE5jKpk8PP4qvvJ1QVy8su",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0348e843dc5b1bd246e6309b4924b81543d02b16c8083df973a89ce2c7eb89a10d"),
	key: hex("0000000000000000000000000000000000000000000000000fc07a1825367bbe", 60).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYkzijLsc5qE43yZ5eLV"),
	prize: .6,
	solvedAt: "2019-02-17 11:59:52",
	solveTime: 129059558,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .06),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .54),
		claim("6c08747ecd15904128c3f15f3bf47f6f365405da2661f17eb5119008807cee3e", "2019-02-17 11:59:52", .6)
	]
});
const bits61 = puzzle({
	id: "bits/61",
	chain: "bitcoin",
	address: "1AVJKwzs9AskraJLGHAZPiaZcrpDr1U6AB",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0249a43860d115143c35c09454863d6f82a95e47c1162fb9b2ebe0186eb26f453f"),
	key: hex("00000000000000000000000000000000000000000000000013c96a3742f64906", 61).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYmLDHsih379uP9zbHSD"),
	prize: .61,
	solvedAt: "2019-05-11 12:53:18",
	solveTime: 136233964,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .061),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .549),
		increase("cdae2da8fe4b18dc264e568a29e804f2b32529b8018a9d28e271ac7e9077c718", "2019-02-24 21:48:34", 793e-8),
		claim("481d2b7ceb253520336fbbe681126ae58d14ecd552320d88203b2e806e76358d", "2019-05-11 12:53:18", .61)
	]
});
const bits62 = puzzle({
	id: "bits/62",
	chain: "bitcoin",
	address: "1Me6EfpwZK5kQziBwBfvLiHjaPGxCKLoJi",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03231a67e424caf7d01a00d5cd49b0464942255b8e48766f96602bdfa4ea14fea8"),
	key: hex("000000000000000000000000000000000000000000000000363d541eb611abee", 62).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYpCemuaUp7NigjvtJug"),
	prize: .62,
	solvedAt: "2019-09-08 10:51:01",
	solveTime: 146594627,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .062),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .558),
		increase("1377682be6c1b875153d7c2d5bceb9985cdf6b6d1054d96b20c4e8ccc7963195", "2019-06-11 10:21:45", 61e-6),
		increase("c6c7ec1a1435c9f049857fc8cf37ab14b90ee2a83e28e9bd059175ae17e955f8", "2019-06-20 19:31:16", 1e-5),
		increase("c725a765997cf82ca4a40cb2166f9ed2c2677e9ad9446112dd94920db7034a07", "2019-06-20 20:49:30", 1e-5),
		increase("9623ca8da4f10db5ca90a0673674571a3150e568cb82c2e2ad6ca55af77a67f9", "2019-06-20 21:20:44", 1e-5),
		claim("d96269bdbae871174f629f4ec136d8c2c99cb1a1db15d12903418dfc92df5465", "2019-09-08 10:51:01", .620091)
	]
});
const bits63 = puzzle({
	id: "bits/63",
	chain: "bitcoin",
	address: "1NpYjtLira16LfGbGwZJ5JbDPh3ai9bjf4",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0365ec2994b8cc0a20d40dd69edfe55ca32a54bcbbaa6b0ddcff36049301a54579"),
	key: hex("0000000000000000000000000000000000000000000000007cce5efdaccf6808", 63).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYv5Z9J7hv7VYYN3XL3Y"),
	prize: .63,
	solvedAt: "2019-07-12 12:26:39",
	solveTime: 141589165,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .063),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .567),
		increase("5738c12f1c607609b6a33b870981c79d67bbbe4e43bfdf0799f7efd5d866aac2", "2019-06-20 19:31:16", 1e-5),
		increase("c725a765997cf82ca4a40cb2166f9ed2c2677e9ad9446112dd94920db7034a07", "2019-06-20 20:49:30", 1e-5),
		increase("9623ca8da4f10db5ca90a0673674571a3150e568cb82c2e2ad6ca55af77a67f9", "2019-06-20 21:20:44", 1e-5),
		claim("195876f004cb9cfa4ff22f4d3df94feda86c5a481fde6979889ea568ac2ca4ac", "2019-07-12 12:26:39", .63003)
	]
});
const bits64 = puzzle({
	id: "bits/64",
	chain: "bitcoin",
	address: "16jY7qLJnxb7CHZyqBP8qca9d51gAjyXQN",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03100611c54dfef604163b8358f7b7fac13ce478e02cb224ae16d45526b25d9d4d"),
	key: hex("000000000000000000000000000000000000000000000000f7051f27b09112d4", 64).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qZ6FxoaD5r1kYegmtbaT"),
	prize: .64,
	solvedAt: "2022-09-09 22:49:03",
	solveTime: 241418509,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .064),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .576),
		increase("c725a765997cf82ca4a40cb2166f9ed2c2677e9ad9446112dd94920db7034a07", "2019-06-20 20:49:30", 1e-5),
		increase("9623ca8da4f10db5ca90a0673674571a3150e568cb82c2e2ad6ca55af77a67f9", "2019-06-20 21:20:44", 1e-5),
		increase("ed53ace1d284e1b9c5b2058fd296ee7d5be43efd6ce87d0a03adfe039c171e28", "2019-10-31 00:45:03", 564e-8),
		increase("5815ecc9699c32adbfc77e2f7bd0e35c87e3ffeacd248cac7eb35452b49d508d", "2020-11-23 03:00:39", 1e-5),
		increase("e6e7ee7bcb9a9b616121faa56cdd6e8a1d9c5fd93a67b41c93c705d396b8ea26", "2020-12-08 18:48:04", 12e-5),
		increase("776b63fc5506eb23ec7aec5b89db0c51c228a3c592939af1a6f802faa97f5d13", "2020-12-20 05:03:18", 1e-5),
		increase("7696793c052f4ed3362a0036f8cb7aa11302c134f2e4af2eae933af54809969c", "2021-05-07 22:44:07", 2021e-8),
		increase("8058cbfcbe89688aaac3a48c65f461a3efa5e09c536b4c4211b4030f311588b3", "2021-08-29 11:30:32", 2e-5),
		increase("5ba85ff53e1c4816d96490d9b4ff06cd8b07751298a846e7579131c5973d348b", "2022-02-22 11:26:14", 696e-8),
		increase("07af703e54e326116144536a2da7fe732224cb07de96d99be9031b443e74a619", "2022-03-31 20:58:56", 101e-7),
		increase("294e3134d6fbb970131236ca947965b23b5bfb8e1e5eeb070b567f06a903f4e3", "2022-05-17 19:19:30", 642e-8),
		increase("a63f1b15dd736529b29f92b443bf401c41d190403923f8fc913d377c2acea1c4", "2022-06-01 00:14:56", 10026e-8),
		claim("9c1d797c34e3b04f9b721bac45fe3a410393bdd25d169bc62dcbca46b069fa9f", "2022-09-09 22:49:03", .64032959)
	]
});
const bits65 = puzzle({
	id: "bits/65",
	chain: "bitcoin",
	address: "18ZMbwUFLMHoZBbfpCjUJQTCMCbktshgpe",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0230210c23b1a047bc9bdbb13448e67deddc108946de6de639bcc75d47c0216b1b"),
	key: hex("000000000000000000000000000000000000000000000001a838b13505b26867", 65).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qZM21gaY8WN2CdwnTG57"),
	prize: .65,
	solvedAt: "2019-06-07 16:39:02",
	solveTime: 138580308,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .065),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .585),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("43bb89f7d16fb47fee3eaeee0fa26aa2d0d6874c8907b2eca4ec2420bf4a9dc3", "2019-06-07 16:39:02", .65)
	]
});
const bits66 = puzzle({
	id: "bits/66",
	chain: "bitcoin",
	address: "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("024ee2be2d4e9f92d2f5a4a03058617dc45befe22938feed5b7a6b7282dd74cbdd"),
	key: hex("000000000000000000000000000000000000000000000002832ed74f2b5e35ee", 66).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qZfFoWMiwBt943V7CQeX"),
	prize: 6.6,
	solvedAt: "2024-09-12 22:59:39",
	solveTime: 304836745,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .066),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .594),
		increase("c725a765997cf82ca4a40cb2166f9ed2c2677e9ad9446112dd94920db7034a07", "2019-06-20 20:49:30", 1e-5),
		increase("9623ca8da4f10db5ca90a0673674571a3150e568cb82c2e2ad6ca55af77a67f9", "2019-06-20 21:20:44", 1e-5),
		increase("ab571acb61ec96a4759da551ae37a1fe5accbd353dfca3e1a57cb254e5e0e790", "2019-10-31 20:18:31", 666e-8),
		increase("33ea377a3c0aa2e10f498a41f746d7489e06bf9b6e45b406b817ee96e4cec96b", "2021-01-18 01:01:38", 195e-7),
		increase("4461b388764735edf0b8b35456846c251dc7e281a8837df42f684b4bfce91f72", "2022-09-25 04:13:35", 1e-5),
		increase("c1a490e56f7faea9c064fd30023647780d5b3fa330cd7ec10c60c513c3f36813", "2022-10-18 11:43:20", 1533e-8),
		increase("1602e46f048a7466db2f630f74e6f83a6e72fb2726067ac719c7de3ab784689c", "2022-10-31 14:29:20", 6e-6),
		increase("3615aa6fc46e190a9d542844172a105191c902402ff753c96f6bd591ea2aecad", "2022-11-19 16:31:43", 1e-5),
		increase("acdf413e69ab69a2628e50225096f14fab57483b1d908387e00d593d56abe425", "2023-02-23 03:23:43", 908e-8),
		increase("7cce2dde07daaa77a0c2159ae079cf56a1b9ca8196c0b122666d3d40d5314e22", "2023-03-01 22:38:23", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 5.94),
		increase("a453faa9ef528a3b7918f79f01c07c3fe93f2b8f3d193c89e29a69f40f53b577", "2023-04-27 04:47:38", 3526e-8),
		increase("b33947a7c57fc75ecf94bf4b8809ed0d8cc2c8c0ac0008cfe44c91ebd6854605", "2023-04-30 05:02:59", 1279e-8),
		increase("085fd326dc36377342bbe915533c3c94453875a4408ae9f9f60025e2793b98e1", "2023-05-03 14:39:54", 13364e-8),
		increase("236806fad5606e2a496b6671868f3d4efd77f3b4da7942322b62ebff3a00028b", "2023-07-27 19:04:45", 2869e-8),
		increase("cf7ad170e2f58aea83686095607b12a04cbef15679383a11c124d953bd2c5a6d", "2023-08-25 08:22:59", 749e-8),
		increase("f3db7c0088b6d2f357008854441cfab93583d4cc0d4dc026de0f158f7ce5ac9b", "2023-09-25 15:00:17", 3769e-8),
		increase("6a76cd295c5fe4037511c2e5c2945b99aa52e2fd41d014943c0a975e08a5ce17", "2024-02-19 11:23:46", 67e-6),
		increase("8da7b3599f9fec422ace5d290443c17f685d6e45ce89ca1ee0a334b711f10745", "2024-03-12 21:29:44", 66e-7),
		increase("8cc982de6db7539fa665840ff774d69807a9d85c01e17620205da67de995ea29", "2024-03-14 03:22:22", 1277e-8),
		increase("cff6de5c21176e8cb9d60fcf1e2a2d9a44b9267860126cfddee5d7fa39ab27e1", "2024-03-21 10:13:55", 6018e-8),
		increase("55571ca5e1f86c11a5ec5837aa1edf4262042b4b18379373585047ce8f8938cf", "2024-05-12 00:07:46", 546e-8),
		increase("acdeeb926e2eacd19024867cd7df0b4339c4940687c8562853ef499683f0a064", "2024-05-18 14:37:26", 812e-7),
		increase("b6064fe616abb0221da96652bbdce82b545e4069084cdcdb5cad717b2f301bd2", "2024-06-27 20:23:46", 1629e-8),
		increase("7e8c361a44646e7016d316ce777f838f15cd1cf7440684e884bf37c28f97a642", "2024-07-14 01:09:57", 8382e-8),
		increase("4bac263083823b95b8cac1ece40e5c288bb084eb94efba1b2d73b6dcb6ac30e3", "2024-07-14 05:10:53", 6e-6),
		increase("95dd4f8609851cd7477a5b2e8744a18b7e24e9c8adcb964a4dcaa6e360f17690", "2024-07-25 13:54:46", 66e-7),
		increase("25f02f5997e30cacce3efda3036803fec56c41e96634551ea814a93075a675b4", "2024-07-25 15:11:25", 66e-7),
		increase("0c10efa88389fd8d3ec14930270a1a5bfaab55488e0014cbec092e42a01ab416", "2024-08-03 20:47:01", 16e-6),
		increase("1e298e15cc35a3b195e79acc602cd3e1c503c616ba1bf3a19e1cd0feb1e8db71", "2024-08-19 06:46:05", 5e-4),
		increase("1384102b7955d1c56a2501641d619fccc253a2270003ac6a1d42ad0fde3bb8d7", "2024-08-19 10:45:37", 15e-6),
		increase("619e8eca7bf5ce834f5cee2f49c6cbf4e32a8ec697f49230172691ef1686c024", "2024-09-08 12:46:11", 1448e-8),
		claim("57a88f47e4c047740b782a5562fca143ce85de0373cbff3a7d406e9ae7fc2f5f", "2024-09-12 22:59:39", 5.94)
	],
	solver: party(void 0, { addresses: ["bc1qpkp47q5cucrvnyepsdnjcv2kzyav5ze0ta7n67"] })
});
const bits67 = puzzle({
	id: "bits/67",
	chain: "bitcoin",
	address: "1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0212209f5ec514a1580a2937bd833979d933199fc230e204c6cdc58872b7d46f75"),
	key: hex("00000000000000000000000000000000000000000000000730fc235c1942c1ae", 67).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qbP2K5cm35XKMND1X1KW"),
	prize: 6.7,
	solvedAt: "2025-02-21 01:41:01",
	solveTime: 318756827,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .067),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .603),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.03),
		increase("63da7a056b214b7de07511366662a889cc916dde2b7421fc4606bc1ed63e6fc6", "2023-09-25 15:00:17", 3769e-8),
		increase("55571ca5e1f86c11a5ec5837aa1edf4262042b4b18379373585047ce8f8938cf", "2024-05-12 00:07:46", 546e-8),
		increase("69888f5e55d414b8de65f3a9307a1f414d7035cf9142239045300ce018984bd4", "2024-09-24 16:44:24", 3703e-8),
		increase("ee5bf15d6e65f87353d46cd084b4f3052d8315c6a157ef757acff58f8b5b2429", "2024-10-17 00:54:49", 2e-5),
		increase("d26e3fdad584be13a085094c0668a61f84326a5f9ec316baaf2ce7931b8a8863", "2024-10-21 01:11:34", 678e-8),
		increase("22e955db5c02e10f89045df063af7c320b8e813916cb974d4452fd5eed57687a", "2025-01-28 07:27:07", 6e-6),
		increase("354a780bb64d0c953262389833531c32e45a6e041fddff43babf0f7360c7adfb", "2025-02-05 09:09:28", 398e-8),
		increase("d528fad306f89d7e2cafc8474dc9c1579bd4ae2f9a4f3f19c7a30fef6410d5b4", "2025-02-11 14:13:02", 547e-8),
		increase("222f724a59f4bb8e3d6ed81bf07a13a65bed21b2d33843d2654e221bdba8f7ce", "2025-02-11 14:20:07", 1e-5),
		claim("0be77ec8bec331da8750c8b715085c6cf6c374ca31f829a515c62b9846e32986", "2025-02-21 01:41:01", 6.70013241)
	],
	solver: party(void 0, { addresses: ["bc1qfk357t8n045f8mwx672rx2re4pftm5gmjzdwq7"] })
});
const bits68 = puzzle({
	id: "bits/68",
	chain: "bitcoin",
	address: "1MVDYgVaSN6iKKEsbzRUAYFrYJadLYZvvZ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("031fe02f1d740637a7127cdfe8a77a8a0cfc6435f85e7ec3282cb6243c0a93ba1b"),
	key: hex("00000000000000000000000000000000000000000000000bebb3940cd0fc1491", 68).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qd7sDG4F2sdMtzNe8y2U"),
	prize: 6.8,
	solvedAt: "2025-04-06 22:52:42",
	solveTime: 322634728,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .068),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .612),
		increase("65264bade4a3cf484d649b058a6482fc66bbf3b710d342c83fdf311e97567b05", "2023-03-26 00:46:41", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.12),
		increase("e2d8d24e4ce591bebc0dd92c55596d4e6f21e38ce4118de9625cad351a732ce5", "2023-09-25 15:00:17", 3768e-8),
		increase("55571ca5e1f86c11a5ec5837aa1edf4262042b4b18379373585047ce8f8938cf", "2024-05-12 00:07:46", 546e-8),
		increase("82663b99c18c61a81515342df76ad42560d9c3a91bdc5695830a114c874e94b1", "2025-01-28 07:26:42", 6e-6),
		increase("d8ac1247594800c6de2cf8fe72bf0a8431016af708a741b46c753a16c9a855b3", "2025-02-04 12:20:30", 1e-5),
		increase("2ae40c9480cd4608754636bf14ae0b978e589b59f38f9e48a21f03bd084ce622", "2025-03-06 21:44:48", 1e-8),
		increase("6907f589ffc4eb2889f154c292c3ae54cb046b395066485d6d598dddd88e38d0", "2025-03-07 06:51:25", 22e-6),
		increase("5be41d92b4a9829e2555cf7389dfc8f62209a1ff7f60bae5634518f5287d881f", "2025-03-16 03:24:47", 1e-8),
		increase("42cfb3573cdb540cffdca9376802234bf04e843c1dfaae9a877447c57626e286", "2025-03-22 03:10:27", 833e-8),
		increase("0f58191b0bedc574e0ca12026f66066f6a919aa4687d7216b89812ca64eaa5bb", "2025-03-28 20:09:27", 8e-6),
		increase("0e0fe0335638be35190b4b251d2ae67579feb5a14774cbcd4180b40b9a793a3c", "2025-03-29 01:18:50", 666e-8),
		increase("aff11a074048fba3b545f1498d0b0d32dd2f2309864deb4550d4dd29727324b4", "2025-03-29 11:13:43", 775e-8),
		increase("017cfc42405a2dae6417b9137e452268f1d936ef7410c1b5e387dee755387edb", "2025-03-29 16:41:47", 647e-8),
		increase("e3b4d2f6971099039b7b47869bdc2217fc37119bf98fbe2e44be85cc29c133c1", "2025-03-30 00:50:59", 775e-8),
		increase("4328caeff6a8679a6a64e9b835d3c08ab26554c4b89042c77581f7a6904f0eb9", "2025-03-30 01:23:03", 783e-8),
		increase("47e20f8b984c3bf2740ab724204d3fe74ce8f1fc68f0060967ef7d94e0e16504", "2025-03-30 01:23:03", 771e-8),
		increase("285a933772c91d5202225015ed6fc9f8a24f3140042a0893dead42ce140e4e14", "2025-04-03 06:38:53", 1e-8),
		claim("a5635eb2205bd3024e55156ee353110415829d1c6bc947f42bfa162488b0eb08", "2025-04-06 22:52:42", 6.80015167)
	],
	solver: party(void 0, { addresses: ["bc1qfwpccz2udt3efk7y2wt9l44h34cs5yevjc80lk"] })
});
const bits69 = puzzle({
	id: "bits/69",
	chain: "bitcoin",
	address: "19vkiEajfhuZ8bs8Zu2jgmC6oqZbWqhxhG",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("024babadccc6cfd5f0e5e7fd2a50aa7d677ce0aa16fdce26a0d0882eed03e7ba53"),
	key: hex("0000000000000000000000000000000000000000000000101d83275fb2bc7e0c", 69).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qefJjCmLAPHbQ4x7D9Qy"),
	prize: 6.9,
	solvedAt: "2025-04-30 14:45:54",
	solveTime: 324679120,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .069),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .621),
		increase("0401d3fd3016076ac5a81dc51b3b6198375ae70c3e7b63be2f33ae9469b7527e", "2022-04-01 06:05:22", 547e-8),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.21),
		increase("a9334d335e59aa30832d57641085d0ff4c61a26fc16c4bed22368b0659539463", "2023-09-25 15:00:17", 3768e-8),
		increase("55571ca5e1f86c11a5ec5837aa1edf4262042b4b18379373585047ce8f8938cf", "2024-05-12 00:07:46", 546e-8),
		increase("e4d9ea3521786bc65afaa9150935146d4068c8638bde45e76c9d09462f19da9b", "2024-07-21 16:43:01", 82e-6),
		increase("598d68ece8df8ca9baf6de361ce8c40bb7956342348d569f219d65e5725b627c", "2025-01-28 07:27:07", 6e-6),
		claim("a52c5046f3097a8c2bd3b9889df2fb47b104d47a16cc679d3357feec003db753", "2025-04-30 14:45:54", 6.9)
	],
	solver: party(void 0, { addresses: ["15g7XHM6u921DvvPrgguxYkxDL8ruPGHXZ"] })
});
const bits70 = puzzle({
	id: "bits/70",
	chain: "bitcoin",
	address: "19YZECXj3SxEZMoUeJ1yiPsw8xANe7M7QR",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0290e6900a58d33393bc1097b5aed31f2e4e7cbd3e5466af958665bc0121248483"),
	key: hex("0000000000000000000000000000000000000000000000349b84b6431a6c4ef1", 70).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qt5RQNhFCn1r58in2E78"),
	prize: .7,
	solvedAt: "2019-06-09 17:08:45",
	solveTime: 138754891,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .07),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .63),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("482232a3d21b7062d1aaf88a63466fd00eabcb248ae8b92aae82e4bb833afcd7", "2019-06-09 17:08:45", .7)
	],
	solver: party(void 0, { addresses: ["3MpeFYTuwfrxSnUXNmTnY3XTgvhPp5k7vF"] })
});
const bits71 = puzzle({
	id: "bits/71",
	chain: "bitcoin",
	address: "1PWo3JeB9jrGwfHDNpdGK54CRas7fsVzXU",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(71),
	prize: 7.1019168,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .071),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .639),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.39),
		increase("5863063e1fdc2ef84cbb3cea03181faec9e62356a56dc330e7511f67ec50d610", "2023-09-25 15:00:17", 377e-7),
		increase("8c75b040d6f335cd1965b205938435baa6bb1b8a2b00038f71d991fd3c7dc0b7", "2025-01-28 02:11:50", 6e-6),
		increase("b30914607fed925b42a87004ed3b373bd413ac35302d007f28ffbb738c63245e", "2025-05-03 09:59:35", 1e-5),
		increase("076d820e3100580012a1bcca15987c0d8638cae912f1f4421f05e97cbcdec3b9", "2025-05-19 18:56:09", 1e-8),
		increase("e29e1a2200867cbd886a42c8222f0dee1a53b83aa577df5e477d11e3fa9e90cc", "2025-05-21 10:01:44", 888e-7),
		increase("72fa88fe21d2cb40c1af0a3022d4e5736ae1c66c6f1afe72463e1791706629c5", "2025-07-30 09:32:34", 1e-5),
		increase("966c854ce03054ef38f6fdf5ee9a746f03bb34d2ec86101e214d22b2f15b0f0f", "2025-08-22 06:05:53", 1767e-8),
		increase("dc895ad8b1eb570560326bd0f9c8504304cf03f51c0ce2a753fc4cf29108d24b", "2025-09-01 21:47:45", 71e-7),
		increase("c03df28a719a110c50b51e92a0831c28433d6b12180a94e63c4c519b28654e1b", "2025-09-02 21:04:37", 898e-8),
		increase("9540c7d4ca42c32cafa643f4dd3f0a4c3beca2fc3c585cd980f474acb6a0267c", "2025-09-03 02:48:52", 1e-5),
		increase("8aa20456d64c7969d0546cd819437275e78d9bcbc692e93b26129faa98de5cd7", "2025-10-07 08:31:00", 2e-8),
		increase("2a18ccf613b076d633099a4da35fd7f72bc3c2a87a2f72a111176dc64271cc11", "2025-10-18 00:18:40", 1e-5),
		increase("eefa0ac5426b7b6df98d7d85d172d7e42cb714c649ac8fb9629e5571ee7dd78f", "2025-12-13 13:35:31", 1941e-8),
		increase("a2808acb455f636dc988186219d025e6507bd80640b0056b46583232aee7cfa5", "2025-12-14 21:33:17", 1e-8),
		increase("984a21a08b0318946289e7a7fd4ffa2f6589a35479a144385be332690e5de5d0", "2026-01-05 13:57:50", 272e-8),
		increase("284abb50eef592bc67df021400acdec80830b416d6bdae0baadbb690f4aaf215", "2026-01-07 12:38:55", 546e-8),
		increase("0b2420fd30112883c6b2cfe8be555c9ebe1f8b7e8a72ad0c6ff862f3287d3c49", "2026-01-12 20:47:15", 808e-8),
		increase("9dbf08a2d3a325891bb93fa41659e095f0fd6a1f3507d94f9a48c0e398e4f7b0", "2026-01-15 02:55:03", 1e-5),
		increase("152210173d20a6945fe353d7cc4b02c431756a3009466dffd51723d55c6b4cc4", "2026-01-15 17:38:51", 16608e-8),
		increase("e1ff88820314e973dfbaf9ae4a9869f7780cff94c63571b21dbdfbc6dfdf4839", "2026-01-29 08:44:39", 853e-8),
		increase("5e15cf4939b4012f61176cc63fea74ab16c25015609cd3c05ab22f168a983bd6", "2026-02-15 14:22:00", 1e-5),
		increase("65fa8a09a6e50826ffcc9e824de6b83a3c7906d7353c2af10c45eb666c4d80f2", "2026-03-08 22:20:18", 15e-6),
		increase("ff344c2d1fed64aa345a1e448f041d778ce8c03c7d89751fb160765c9ee2740f", "2026-03-23 01:56:36", 7354e-8),
		increase("35e4b13cc20c46400e7551246c21be9a8aefd729615d0194fe684781d9354e33", "2026-03-24 07:29:31", 555e-8),
		increase("2fa444ecb35f83b54ece03325cb047e1c7453f8bf1e716923072968955a15fd9", "2026-03-30 15:55:35", 42e-6),
		increase("032364b1aceb70a8c5d93170d159fc09df9b95ffcee37a15bda9f4ecfe6179b0", "2026-05-26 21:07:04", 42119e-8),
		increase("63188eff17a01aeaaa72c27306a8896f06733a1531cb0bb1f0560ac32a1b8284", "2026-06-05 06:02:18", 4623e-7),
		increase("644e73476fe7ebfe3ac95dfb7a50180943997558ec952a9849c4acfbee6def41", "2026-06-13 20:17:13", 5e-5),
		increase("d8001be6f64a846dc16c5c79708f2bec1554a2abed31d909fa0202bc2040c7ac", "2026-06-14 20:33:01", 1678e-8),
		increase("6aa21285b68b42210e97b44009429261245af4fb6054e7ffe6857d5951153699", "2026-06-15 23:34:38", 546e-8),
		increase("bfdb9acaf7d7ca4d798c88a59466fe950cbc3a27dc6ea0b2b6685415dcba2afc", "2026-06-27 02:59:16", 1033e-8),
		increase("fe44716d0ec7798d3a3c7cf0aa0c1b07681e176d171cbcb9d13300edcea6f90b", "2026-07-19 08:27:00", 329e-7),
		increase("7384a29ca2d82b8c6117963afa83885a5f43186b496affeb014fda1ac7779ba8", "2026-07-19 12:51:21", 1938e-8),
		increase("297d8f415591e4cd8353d70a3e6a471b261b4f096954ab330eb0181b669ec750", "2026-07-19 13:00:54", 1938e-8),
		increase("0e3dcbe4b1b2b6407ce09910190d7cee04f5bf030b7db1df99fb564bdc03f762", "2026-07-19 21:36:29", 1551e-8),
		increase("b8451f855fb33815b578039a3219fddd16763ef9e71f0d1ef6bc3edd7d9f29a8", "2026-07-19 22:07:06", 686e-8),
		increase("1283d0dc13599516ec1ce3b900330db0c42e30491b04cd60c673d9c22eb3fc29", "2026-07-19 22:39:09", 773e-8),
		increase("1c8fc46f617594c886aca25526c544533cfc127b39ebfcfec3e61f43471e92bf", "2026-07-20 00:01:11", 702e-8),
		increase("8480a75d513c27ebc23e2ffbca17de8c6ac75b0c31fd8d1e2cbef1ed25b6467c", "2026-07-20 09:40:54", 666e-8),
		increase("0a6a0b5caaaba7f868d393c6e19e6ce5f5c62c4dbb1e457f0ea362e3a50aac5b", "2026-07-20 11:08:30", 3298e-8),
		increase("ca091c302eb10ae5ec6a6c850b6955b1dfca44d30e38790f9cb8c75784b70b35", "2026-07-20 12:37:11", 555e-8),
		increase("a7565ba869b988b228668fdd7853c406ce9913d3dd2d0a667ab3b189cc1d847f", "2026-07-20 12:37:11", 555e-8),
		increase("73a9db56c8c9c8aab3c727488de45c5a852d4d78da18d060a48c362415c065c3", "2026-07-24 13:09:38", 713e-8),
		increase("61d9f47959e2364256f2b2576daf485b327db0a1962a7d2c073127ab794d087e", "2026-07-24 13:09:38", 702e-8),
		increase("ef872a19a5159d35f037ded08631b057b957d3757baf12fe939b89d867e3321a", "2026-07-24 13:09:38", 773e-8),
		increase("529d041487c2cef0aff782fa1547b75e5695e84c4cbe4b59bc9403468af8100e", "2026-07-24 13:09:38", 704e-8),
		increase("3ab162360b094a2f9e825ae2d1ee4597d098a659929359b311828393e13e2f36", "2026-07-24 13:09:38", 726e-8),
		increase("eaa5fc9c796bbe9fdd441bdbfd295639b28654dd9b9c6d3855367d16b8e95900", "2026-07-24 13:09:38", 817e-8),
		increase("ee23b442cdfe2080d8fb348c8c06b2c59582bfeb45a129f4cf74cec603b2d13c", "2026-07-29 22:02:02", 4427e-8),
		increase("c68a525265cc75e59dd74ef071daf1bb170dc3c62a9bb702c0d636db40632ae2", "2026-07-31 21:53:57", 1e-5),
		increase("e06d7c2aaec6a758fb5d9d36c3037c595670bbe3d2e176d6ae4af0e052313375", "2026-08-02 05:01:01", 1e-5),
		increase("b67d201718b257919ec07ece007225b0bf204121c1acee9807ee61ecb362e2b6", "2026-08-05 17:40:23", 1e-5),
		increase("4e1f8778fbdb3fcc14d7d03d80012f3ad1900f243a0155ad3b930d8c4fec7b54", "2026-08-07 10:10:12", 1e-5),
		increase("8d99b7667ac8f865b33da5cdda4683aadb8728c36fcb33a96cec34630ddc405c", "2026-08-22 19:25:20", 1e-5),
		increase("1907d09cf2c8f2164aa05c6a6d82537d7c1d5668fe79492b434b269f52f652d9", "2026-08-23 16:20:06", 1e-5),
		increase("35710a42f5b8ea7a9b4d9813460a44b1fba27adf97647f8dfac96d20f70af362", "2026-09-16 18:11:43", 666e-8),
		increase("5bbde111c3fe367de128459453338652ebf11b2be2a237c03bbf2e6412f7a13a", "2026-09-16 18:11:43", 666e-8),
		increase("7c86f3093374296f9035d68176cadf6fd37dae4d6bd4ce6067d4a25b9d7b8b2a", "2026-09-16 18:11:43", 666e-8),
		increase("9768a5ae6a22dfa331cd26039d8a6f2c203b2edf9075385c49af4ba8c2213f28", "2026-09-16 18:11:43", 555e-8),
		increase("f434dbf68fba76465eeb9fdec908722aeec61bf4a30714d5498d21c61664503a", "2026-09-16 18:11:43", 555e-8),
		increase("eb8fc796edfdb7efe19531687e7344a5a2365078f5d3ac40ec5b6679c54ad2b0", "2026-09-16 18:11:43", 555e-8),
		increase("6b54e6eecb97e457863e0d7236aaf125c2359dc159b50a529dfbf58b73e692d4", "2026-09-16 18:11:43", 555e-8),
		increase("74edb91701e5f63c9379b3a0ca382d4a791c129c5e2352b4a385921211f5dd7a", "2026-09-16 18:11:43", 555e-8),
		increase("224c0fdcce7711bfe65ecc4b5098f0ef7ebe5335faaa1e6e6ca98b77edcab6c4", "2026-09-16 18:11:43", 555e-8),
		increase("f65440d9d2820cba798243fb46fcaebac062f0ea5e075301e77099700209cda0", "2026-09-28 21:11:49", 1e-5),
		increase("572001d88e5c3030a89fe119e62cf80892876b59dcb9efe91348dd38745147e1", "2026-09-29 22:18:51", 666e-8)
	]
});
const bits72 = puzzle({
	id: "bits/72",
	chain: "bitcoin",
	address: "1JTK7s9YVYywfm5XUH7RNhHJH1LshCaRFR",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(72),
	prize: 7.20014379,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .072),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .648),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.48),
		increase("7d7dc5027ad971387295921620df609642fb4040a782a6b795be71c1e821ae93", "2023-09-25 15:00:17", 3779e-8),
		increase("caa959d2e425bd209e5ae73348b247716c71e56b8216aeccf7685733edd08631", "2025-01-28 07:27:07", 6e-6),
		increase("4b7c35b7ca546193090d58aaf4746f2d5c08fa024bab23f13d8aff3d7a15e030", "2025-08-06 12:50:58", 1e-4)
	]
});
const bits73 = puzzle({
	id: "bits/73",
	chain: "bitcoin",
	address: "12VVRNPi4SJqUTsp6FmqDqY5sGosDtysn4",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(73),
	prize: 7.30013849,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .073),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .657),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.57),
		increase("cd85afbaa9901d8ede400248713942ff56cfe92806500940624b671f947f508b", "2023-09-25 15:00:17", 3777e-8),
		increase("d1824b78030f9d670b2e8aaedd1cc9b042951f96a59ad59790a35917bfbdfc54", "2025-01-27 14:10:18", 6e-6),
		increase("d39bfb73aa05305025c7179d0477201403219556d8d56c7d038c934a08e85e91", "2025-11-24 09:49:26", 9472e-8)
	]
});
const bits74 = puzzle({
	id: "bits/74",
	chain: "bitcoin",
	address: "1FWGcVDK3JGzCC3WtkYetULPszMaK2Jksv",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(74),
	prize: 7.40004977,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .074),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .666),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.66),
		increase("49548037c2bc4a22da68dd097be67d98a1e8f47aeaaac6fb92751f755e7d89eb", "2023-09-25 15:00:17", 3777e-8),
		increase("480f8e96b46315d494fecc06f035e782179e5d9aae7e7417be55c63ff96f06e8", "2025-01-28 03:11:55", 6e-6),
		increase("89993b4ff06bc6ee94af5b7e78888cbcbdefa38335a53342e4d371f70fa472e6", "2025-02-10 06:05:27", 6e-6)
	]
});
const bits75 = puzzle({
	id: "bits/75",
	chain: "bitcoin",
	address: "1J36UjUByGroXcCvmj13U6uwaVv9caEeAt",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03726b574f193e374686d8e12bc6e4142adeb06770e0a2856f5e4ad89f66044755"),
	key: hex("0000000000000000000000000000000000000000000004c5ce114686a1336e07", 75).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3yHuxB7NfERRuDTNy2kbr"),
	prize: .75,
	solvedAt: "2019-06-10 21:05:57",
	solveTime: 138855523,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .075),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .675),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("e1a5d5ac5db02801828ec79e6c94fa724525eaa0f6f7fd303dc14a1e9d0f4c64", "2019-06-10 21:05:57", .75)
	]
});
const bits76 = puzzle({
	id: "bits/76",
	chain: "bitcoin",
	address: "1DJh2eHFYQfACPmrvpyWc8MSTYKh7w9eRF",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(76),
	prize: 7.6,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .076),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .684),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.84)
	]
});
const bits77 = puzzle({
	id: "bits/77",
	chain: "bitcoin",
	address: "1Bxk4CQdqL9p22JEtDfdXMsng1XacifUtE",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(77),
	prize: 7.70002426,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .077),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .693),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 6.93),
		increase("8c161394a9cd1f201b0f6d4898cb5cfdff9399f618eee6c1ddf1b76b56e96e71", "2023-11-29 09:47:58", 1826e-8),
		increase("599bfd6ded754b082dcff0eec969a436ffa9cc888ac515dfe2d5ad4fa96f287f", "2025-01-27 18:29:28", 6e-6)
	]
});
const bits78 = puzzle({
	id: "bits/78",
	chain: "bitcoin",
	address: "15qF6X51huDjqTmF9BJgxXdt1xcj46Jmhb",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(78),
	prize: 7.8,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .078),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .702),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.02)
	]
});
const bits79 = puzzle({
	id: "bits/79",
	chain: "bitcoin",
	address: "1ARk8HWJMn8js8tQmGUJeQHjSE7KRkn2t8",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(79),
	prize: 7.9,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .079),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .711),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.11)
	]
});
const bits80 = puzzle({
	id: "bits/80",
	chain: "bitcoin",
	address: "1BCf6rHUW6m3iH2ptsvnjgLruAiPQQepLe",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("037e1238f7b1ce757df94faa9a2eb261bf0aeb9f84dbf81212104e78931c2a19dc"),
	key: hex("00000000000000000000000000000000000000000000ea1a5c66dcc11b5ad180", 80).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZiAPRB6KvN7FnKsw69PP7vW"),
	prize: .8,
	solvedAt: "2019-06-11 11:08:53",
	solveTime: 138906099,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .08),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .72),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("bb05d206d64e20c706a7da14cd49b4f80d0c92995db193428ebda753e578ce79", "2019-06-11 11:08:53", .8)
	]
});
const bits81 = puzzle({
	id: "bits/81",
	chain: "bitcoin",
	address: "15qsCm78whspNQFydGJQk5rexzxTQopnHZ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(81),
	prize: 8.100015,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .081),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .729),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.29),
		increase("3f83b6358b828308e0e64bca18b727c0169636519ecb6643118c9a68d302b9e2", "2025-10-14 12:07:24", 15e-6)
	]
});
const bits82 = puzzle({
	id: "bits/82",
	chain: "bitcoin",
	address: "13zYrYhhJxp6Ui1VV7pqa5WDhNWM45ARAC",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(82),
	prize: 8.2,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .082),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .738),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.38)
	]
});
const bits83 = puzzle({
	id: "bits/83",
	chain: "bitcoin",
	address: "14MdEb4eFcT3MVG5sPFG4jGLuHJSnt1Dk2",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(83),
	prize: 8.30002046,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .083),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .747),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.47),
		increase("cead5b26ed54835eeb0ac603c983a9c052512eb5d2655e6bfb60e6a8e3fb74d9", "2024-12-05 00:52:40", 546e-8),
		increase("2d87bb6d81ae091a0c07a69131c404c32b68d55070d913a41263389a1f5a244b", "2025-10-28 12:50:52", 15e-6)
	]
});
const bits84 = puzzle({
	id: "bits/84",
	chain: "bitcoin",
	address: "1CMq3SvFcVEcpLMuuH8PUcNiqsK1oicG2D",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(84),
	prize: 8.400015,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .084),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .756),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.56),
		increase("99e69ed74aa55f1f92e946909dd2f7e7b488721e3b82aee27fe82f30aef47d0e", "2025-10-28 12:03:12", 15e-6)
	]
});
const bits85 = puzzle({
	id: "bits/85",
	chain: "bitcoin",
	address: "1Kh22PvXERd2xpTQk3ur6pPEqFeckCJfAr",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0329c4574a4fd8c810b7e42a4b398882b381bcd85e40c6883712912d167c83e73a"),
	key: hex("00000000000000000000000000000000000000000011720c4f018d51b8cebba8", 85).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrZkCnRjpBspr8M5K8YnUtDNa"),
	prize: .85,
	solvedAt: "2019-06-17 00:09:39",
	solveTime: 139384945,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .085),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .765),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("bb26e67de6f1b67de29155b6fcd51aa459382803d9b3142091b0373abccc9f81", "2019-06-17 00:09:39", .85)
	]
});
const bits86 = puzzle({
	id: "bits/86",
	chain: "bitcoin",
	address: "1K3x5L6G57Y494fDqBfrojD28UJv4s5JcK",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(86),
	prize: 8.6,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .086),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .774),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.74)
	]
});
const bits87 = puzzle({
	id: "bits/87",
	chain: "bitcoin",
	address: "1PxH3K1Shdjb7gSEoTX7UPDZ6SH4qGPrvq",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(87),
	prize: 8.7,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .087),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .783),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.83)
	]
});
const bits88 = puzzle({
	id: "bits/88",
	chain: "bitcoin",
	address: "16AbnZjZZipwHMkYKBSfswGWKDmXHjEpSf",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(88),
	prize: 8.8,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .088),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .792),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 7.92)
	]
});
const bits89 = puzzle({
	id: "bits/89",
	chain: "bitcoin",
	address: "19QciEHbGVNY4hrhfKXmcBBCrJSBZ6TaVt",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(89),
	prize: 8.9,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .089),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .801),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.01)
	]
});
const bits90 = puzzle({
	id: "bits/90",
	chain: "bitcoin",
	address: "1L12FHH2FHjvTviyanuiFVfmzCy46RRATU",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("035c38bd9ae4b10e8a250857006f3cfd98ab15a6196d9f4dfd25bc7ecc77d788d5"),
	key: hex("000000000000000000000000000000000000000002ce00bb2136a445c71e85bf", 90).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVrbEiEhLWVU4Yn1RCfnX51KrT"),
	prize: .9,
	solvedAt: "2019-07-01 18:09:22",
	solveTime: 140659328,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .09),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .81),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("93037990e3739041347cb63563731c0a302d856e21c2c46b7ff491a2ff1ba9fe", "2019-07-01 18:09:22", .9)
	]
});
const bits91 = puzzle({
	id: "bits/91",
	chain: "bitcoin",
	address: "1EzVHtmbN4fs4MiNk3ppEnKKhsmXYJ4s74",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(91),
	prize: 9.1,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .091),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .819),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.19)
	]
});
const bits92 = puzzle({
	id: "bits/92",
	chain: "bitcoin",
	address: "1AE8NzzgKE7Yhz7BWtAcAAxiFMbPo82NB5",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(92),
	prize: 9.2,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .092),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .828),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.28)
	]
});
const bits93 = puzzle({
	id: "bits/93",
	chain: "bitcoin",
	address: "17Q7tuG2JwFFU9rXVj3uZqRtioH3mx2Jad",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(93),
	prize: 9.3,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .093),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .837),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.37)
	]
});
const bits94 = puzzle({
	id: "bits/94",
	chain: "bitcoin",
	address: "1K6xGMUbs6ZTXBnhw1pippqwK6wjBWtNpL",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(94),
	prize: 9.4,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .094),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .846),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.46)
	]
});
const bits95 = puzzle({
	id: "bits/95",
	chain: "bitcoin",
	address: "19eVSDuizydXxhohGh8Ki9WY9KsHdSwoQC",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02967a5905d6f3b420959a02789f96ab4c3223a2c4d2762f817b7895c5bc88a045"),
	key: hex("0000000000000000000000000000000000000000527a792b183c7f64a0e8b1f4", 95).wif("KwDiBf89QgGbjEhKnhXJuH7LrciVsLfMYB8ydZ3QXMqEra1sapfT"),
	prize: .95,
	solvedAt: "2019-07-06 06:53:41",
	solveTime: 141050787,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .095),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .855),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("2b46d8d754b712c0c481185f07fa7b11100fe48f807069fc2e0779735d81c99e", "2019-07-06 06:53:41", .95)
	]
});
const bits96 = puzzle({
	id: "bits/96",
	chain: "bitcoin",
	address: "15ANYzzCp5BFHcCnVFzXqyibpzgPLWaD8b",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(96),
	prize: 9.600006,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .096),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .864),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.64),
		increase("4fc70c0b7d7ad5a07e8841eb3e6e724bac7b94c59b86b8844c2e13575a2b8901", "2025-04-07 14:14:43", 6e-6)
	]
});
const bits97 = puzzle({
	id: "bits/97",
	chain: "bitcoin",
	address: "18ywPwj39nGjqBrQJSzZVq2izR12MDpDr8",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(97),
	prize: 9.70002613,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .097),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .873),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.73),
		increase("41ea4b706003301ad5481e7a15125fa056a0179aa2daf774477b4afc44415194", "2025-10-23 08:05:49", 2613e-8)
	]
});
const bits98 = puzzle({
	id: "bits/98",
	chain: "bitcoin",
	address: "1CaBVPrwUxbQYYswu32w7Mj4HR4maNoJSX",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(98),
	prize: 9.8,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .098),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .882),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.82)
	]
});
const bits99 = puzzle({
	id: "bits/99",
	chain: "bitcoin",
	address: "1JWnE6p6UN7ZJBN7TtcbNDoRcjFtuDWoNL",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(99),
	prize: 9.91257338,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .099),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .891),
		increase("cc3fb8769d4e928dab2f5ddbb65838ada2bc0d4e33cfd933d8a1a09fc4b6fa7e", "2022-12-13 23:51:04", 94933e-8),
		increase("17324bb2efbfa6826d6923f580751f28d8c5297f262a764e27d62bc4e9ba5b68", "2023-01-23 02:46:23", .00189209),
		increase("7de20a1b73abad37d2af5ced79297f33b38f724ef4477901765ddbfb740cc834", "2023-02-16 02:52:13", 69016e-8),
		increase("b425616ced3391587a8f778c36a949336c0717c62db71953a658bc16a8c7f748", "2023-02-16 13:39:42", .0090418),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 8.91)
	]
});
const bits100 = puzzle({
	id: "bits/100",
	chain: "bitcoin",
	address: "1KCgMv8fo2TPBpddVi9jqmMmcne9uSNJ5F",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03d2063d40402f030d4cc71331468827aa41a8a09bd6fd801ba77fb64f8e67e617"),
	key: hex("000000000000000000000000000000000000000af55fc59c335c8ec67ed24826", 100).wif("KwDiBf89QgGbjEhKnhXJuH7LrciWJvjTPYdp4sSLwstc63avmfRA"),
	prize: 1,
	solvedAt: "2019-07-08 04:57:04",
	solveTime: 141216590,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .1),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .9),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("d4087636f7c54d382164e4cd9548a1bad6c603664268f74537b6aed8a6371704", "2019-07-08 04:57:04", 1)
	]
});
const bits101 = puzzle({
	id: "bits/101",
	chain: "bitcoin",
	address: "1CKCVdbDJasYmhswB6HKZHEAnNaDpK7W4n",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(101),
	prize: 10.1,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .101),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .909),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.09)
	]
});
const bits102 = puzzle({
	id: "bits/102",
	chain: "bitcoin",
	address: "1PXv28YxmYMaB8zxrKeZBW8dt2HK7RkRPX",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(102),
	prize: 10.2,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .102),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .918),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.18)
	]
});
const bits103 = puzzle({
	id: "bits/103",
	chain: "bitcoin",
	address: "1AcAmB6jmtU6AiEcXkmiNE9TNVPsj9DULf",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(103),
	prize: 10.3,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .103),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .927),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.27)
	]
});
const bits104 = puzzle({
	id: "bits/104",
	chain: "bitcoin",
	address: "1EQJvpsmhazYCcKX5Au6AZmZKRnzarMVZu",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(104),
	prize: 10.400016,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .104),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .936),
		increase("a83225cc95582f66fb42d285c64c52a6a6b6b2cec715e2429c67e3f3243071d0", "2023-02-02 21:40:21", 6e-6),
		increase("123c8804d6d28510c7c11a1b56ea36b4caa1e86f7e6edaf64ee65d16bf9fad67", "2023-02-04 01:25:54", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.36)
	]
});
const bits105 = puzzle({
	id: "bits/105",
	chain: "bitcoin",
	address: "1CMjscKB3QW7SDyQ4c3C3DEUHiHRhiZVib",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03bcf7ce887ffca5e62c9cabbdb7ffa71dc183c52c04ff4ee5ee82e0c55c39d77b"),
	key: hex("000000000000000000000000000000000000016f14fc2054cd87ee6396b33df3", 105).wif("KwDiBf89QgGbjEhKnhXJuH7Lrcim5eBMkFQwQtRbW6wxT1ajoNqE"),
	prize: 1.05,
	solvedAt: "2019-09-23 01:29:47",
	solveTime: 147856953,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .105),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .945),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("1f31aa69f56972c08e70da07c92903949fb0f4cd6b02462c1d0de81130113f14", "2019-09-23 01:29:47", 1.05)
	]
});
const bits106 = puzzle({
	id: "bits/106",
	chain: "bitcoin",
	address: "18KsfuHuzQaBTNLASyj15hy4LuqPUo1FNB",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(106),
	prize: 10.6,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .106),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .954),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.54)
	]
});
const bits107 = puzzle({
	id: "bits/107",
	chain: "bitcoin",
	address: "15EJFC5ZTs9nhsdvSUeBXjLAuYq3SWaxTc",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(107),
	prize: 10.7,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .107),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .963),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.63)
	]
});
const bits108 = puzzle({
	id: "bits/108",
	chain: "bitcoin",
	address: "1HB1iKUqeffnVsvQsbpC6dNi1XKbyNuqao",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(108),
	prize: 10.8,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .108),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .972),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.72)
	]
});
const bits109 = puzzle({
	id: "bits/109",
	chain: "bitcoin",
	address: "1GvgAXVCbA8FBjXfWiAms4ytFeJcKsoyhL",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(109),
	prize: 10.900105,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .109),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .981),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.81),
		increase("5478d5178f0d80ad412b5f5de7d28bb1f31ec1d0eecd0c74f4447bad6d31fc3d", "2025-11-21 18:58:34", 105e-6)
	]
});
const bits110 = puzzle({
	id: "bits/110",
	chain: "bitcoin",
	address: "12JzYkkN76xkwvcPT6AWKZtGX6w2LAgsJg",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0309976ba5570966bf889196b7fdf5a0f9a1e9ab340556ec29f8bb60599616167d"),
	key: hex("00000000000000000000000000000000000035c0d7234df7deb0f20cf7062444", 110).wif("KwDiBf89QgGbjEhKnhXJuH7LrctLcZtumiizzSmSckgpxQu6ieu6"),
	prize: 1.1,
	solvedAt: "2020-05-30 20:04:06",
	solveTime: 169523812,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .11),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .99),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("ed53ace1d284e1b9c5b2058fd296ee7d5be43efd6ce87d0a03adfe039c171e28", "2019-10-31 00:45:03", 7e-6),
		increase("03217c5fa3ab110901d53c998d8ea67e6d9b57f957815a9bd973c7d7fb7ed0f0", "2019-11-11 19:37:03", 997e-8),
		increase("b0a92ea5ae2a58bdf7c6252edc10e6a5a0f1cc4a05455792e4984ca84d2607f4", "2019-11-11 20:54:30", 1636e-8),
		claim("8978a26d73ed11fec60d88f5cdb5f6d762c8e4fdb1dcae924ba5b06eb7fda456", "2020-05-30 20:04:06", 1.10003333)
	]
});
const bits111 = puzzle({
	id: "bits/111",
	chain: "bitcoin",
	address: "1824ZJQ7nKJ9QFTRBqn7z7dHV5EGpzUpH3",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(111),
	prize: 11.1001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .111),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .999),
		increase("0278037d401dd66fab16d5688a203bc776a344232ae107fee0113be1f2d617cd", "2022-03-20 22:30:43", 1e-4),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 9.99)
	]
});
const bits112 = puzzle({
	id: "bits/112",
	chain: "bitcoin",
	address: "18A7NA9FTsnJxWgkoFfPAFbQzuQxpRtCos",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(112),
	prize: 11.2,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .112),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.008),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.08)
	]
});
const bits113 = puzzle({
	id: "bits/113",
	chain: "bitcoin",
	address: "1NeGn21dUDDeqFQ63xb2SpgUuXuBLA4WT4",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(113),
	prize: 11.3,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .113),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.017),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.17)
	]
});
const bits114 = puzzle({
	id: "bits/114",
	chain: "bitcoin",
	address: "174SNxfqpdMGYy5YQcfLbSTK3MRNZEePoy",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(114),
	prize: 11.4,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .114),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.026),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.26)
	]
});
const bits115 = puzzle({
	id: "bits/115",
	chain: "bitcoin",
	address: "1NLbHuJebVwUZ1XqDjsAyfTRUPwDQbemfv",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0248d313b0398d4923cdca73b8cfa6532b91b96703902fc8b32fd438a3b7cd7f55"),
	key: hex("0000000000000000000000000000000000060f4d11574f5deee49961d9609ac6", 115).wif("KwDiBf89QgGbjEhKnhXJuH7LrhcVkatbczm7Y9ZaB56U1jLNU2Xh"),
	prize: 1.15,
	solvedAt: "2020-06-16 07:33:42",
	solveTime: 170947588,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .115),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.035),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("15df42c8d957ca66700a7c6455da76c5d88ee847b47819447527f0985827b1ce", "2020-06-16 07:33:42", 1.15)
	]
});
const bits116 = puzzle({
	id: "bits/116",
	chain: "bitcoin",
	address: "1MnJ6hdhvK37VLmqcdEwqC3iFxyWH2PHUV",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(116),
	prize: 11.6000121,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .116),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.044),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.44),
		increase("0e10fc1cc2288bb2df6dc15a29827aaa71724e1f93bc29b9bc7b9882fde97645", "2025-03-16 03:24:47", 121e-7)
	]
});
const bits117 = puzzle({
	id: "bits/117",
	chain: "bitcoin",
	address: "1KNRfGWw7Q9Rmwsc6NT5zsdvEb9M2Wkj5Z",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(117),
	prize: 11.7,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .117),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.053),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.53)
	]
});
const bits118 = puzzle({
	id: "bits/118",
	chain: "bitcoin",
	address: "1PJZPzvGX19a7twf5HyD2VvNiPdHLzm9F6",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(118),
	prize: 11.80000661,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .118),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.062),
		increase("8c389a5038ef933ad14b81781971e91679cbd563c4ee29c1efa7a9e629ab2d8b", "2021-10-05 07:06:59", 661e-8),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.62)
	]
});
const bits119 = puzzle({
	id: "bits/119",
	chain: "bitcoin",
	address: "1GuBBhf61rnvRe4K8zu8vdQB3kHzwFqSy7",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(119),
	prize: 11.9,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .119),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.071),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.71)
	]
});
const bits120 = puzzle({
	id: "bits/120",
	chain: "bitcoin",
	address: "17s2b9ksz5y7abUm92cHwG8jEPCzK3dLnT",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02ceb6cbbcdbdf5ef7150682150f4ce2c6f4807b349827dcdbdd1f2efa885a2630"),
	key: hex("0000000000000000000000000000000000b10f22572c497a836ea187f2e1fc23", 120).wif("KwDiBf89QgGbjEhKnhXJuH7Lu5nahGjEQZB8k82itXNSb1Aa2Woh"),
	prize: 1.2,
	solvedAt: "2023-02-27 09:40:55",
	solveTime: 256145621,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .12),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.08),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		claim("9628d6d234b57075709a74215bfe2869b4d80b8ada11dd7be1030541ff8a0a53", "2023-02-27 09:40:55", 1.2)
	],
	solver: party("RetiredCoder", {
		key: "retired-coder",
		kind: PartyKind.Person,
		addresses: ["3Emiwzxme7Mrj4d89uqohXNncnRM15YESs", "1Prestige1zSYorBdz94KA2UbJW3hYLTn4"],
		profiles: [profile("github", "https://github.com/RetiredC"), profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=3657819")]
	})
});
const bits121 = puzzle({
	id: "bits/121",
	chain: "bitcoin",
	address: "1GDSuiThEV64c166LUFC9uDcVdGjqkxKyh",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(121),
	prize: 12.1,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .121),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.089),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.89)
	]
});
const bits122 = puzzle({
	id: "bits/122",
	chain: "bitcoin",
	address: "1Me3ASYt5JCTAK2XaC32RMeH34PdprrfDx",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(122),
	prize: 12.2,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .122),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.098),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 10.98)
	]
});
const bits123 = puzzle({
	id: "bits/123",
	chain: "bitcoin",
	address: "1CdufMQL892A69KXgv6UNBD17ywWqYpKut",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(123),
	prize: 12.3,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .123),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.107),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.07)
	]
});
const bits124 = puzzle({
	id: "bits/124",
	chain: "bitcoin",
	address: "1BkkGsX9ZM6iwL3zbqs7HWBV7SvosR6m8N",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(124),
	prize: 12.4,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .124),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.116),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.16)
	]
});
const bits125 = puzzle({
	id: "bits/125",
	chain: "bitcoin",
	address: "1PXAyUB8ZoH3WD8n5zoAthYjN15yN5CVq5",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("0233709eb11e0d4439a729f21c2c443dedb727528229713f0065721ba8fa46f00e"),
	key: hex("000000000000000000000000000000001c533b6bb7f0804e09960225e44877ac", 125).wif("KwDiBf89QgGbjEhKnhXJuH7Nbdz1FhKePEPcr4to6PqoSc6KxQy6"),
	prize: 12.5,
	solvedAt: "2023-07-09 10:24:07",
	solveTime: 267553013,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .125),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.125),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.25),
		claim("25427dc1fa67f259601750d5fbb98427a51d8b319d179557030ff3c4cb66af7e", "2023-07-09 10:24:07", 12.5)
	],
	solver: party("RetiredCoder", {
		key: "retired-coder",
		kind: PartyKind.Person,
		addresses: ["3Emiwzxme7Mrj4d89uqohXNncnRM15YESs", "1Prestige1zSYorBdz94KA2UbJW3hYLTn4"],
		profiles: [profile("github", "https://github.com/RetiredC"), profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=3657819")]
	})
});
const bits126 = puzzle({
	id: "bits/126",
	chain: "bitcoin",
	address: "1AWCLZAjKbV1P7AHvaPNCKiB7ZWVDMxFiz",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(126),
	prize: 12.6,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .126),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.134),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.34)
	]
});
const bits127 = puzzle({
	id: "bits/127",
	chain: "bitcoin",
	address: "1G6EFyBRU86sThN3SSt3GrHu1sA7w7nzi4",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(127),
	prize: 12.7,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .127),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.143),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.43)
	]
});
const bits128 = puzzle({
	id: "bits/128",
	chain: "bitcoin",
	address: "1MZ2L1gFrCtkkn6DnTT2e4PFUTHw9gNwaj",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(128),
	prize: 12.8,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .128),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.152),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.52)
	]
});
const bits129 = puzzle({
	id: "bits/129",
	chain: "bitcoin",
	address: "1Hz3uv3nNZzBVMXLGadCucgjiCs5W9vaGz",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(129),
	prize: 12.9,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .129),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.161),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.61)
	]
});
const bits130 = puzzle({
	id: "bits/130",
	chain: "bitcoin",
	address: "1Fo65aKq8s8iquMt6weF1rku1moWVEd5Ua",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("03633cbe3ec02b9401c5effa144c5b4d22f87940259634858fc7e59b1c09937852"),
	key: hex("000000000000000000000000000000033e7665705359f04f28b88cf897c603c9", 130).wif("KwDiBf89QgGbjEhKnhXJuH8DvUBxVmJ3761ahfZuohBr53Zh9M3t"),
	prize: 13,
	solvedAt: "2024-09-23 08:13:37",
	solveTime: 305733983,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .13),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.17),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.7),
		increase("6fc3dd6147c26e6458a04de586e24330c70b320ec31a67e968ca3eb2f8d5cc70", "2023-12-23 00:22:51", 6e-5),
		claim("91ec88f5d6d6cc727e0205d3aa3709fee507df05140d187846cf22aef784621a", "2024-09-23 08:13:37", 13.00006)
	],
	solver: party("RetiredCoder", {
		key: "retired-coder",
		kind: PartyKind.Person,
		addresses: ["3Emiwzxme7Mrj4d89uqohXNncnRM15YESs", "1Prestige1zSYorBdz94KA2UbJW3hYLTn4"],
		profiles: [profile("github", "https://github.com/RetiredC"), profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=3657819")],
		facts: [fact("Registered the bitcointalk account on October 5, 2024.", "https://bitcointalk.org/index.php?action=profile;u=3657819", { date: "2024-10-05" })]
	})
});
const bits131 = puzzle({
	id: "bits/131",
	chain: "bitcoin",
	address: "16zRPnT8znwq42q7XeMkZUhb1bKqgRogyy",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(131),
	prize: 13.1,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .131),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.179),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.79)
	]
});
const bits132 = puzzle({
	id: "bits/132",
	chain: "bitcoin",
	address: "1KrU4dHE5WrW8rhWDsTRjR21r8t3dsrS3R",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(132),
	prize: 13.2,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .132),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.188),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.88)
	]
});
const bits133 = puzzle({
	id: "bits/133",
	chain: "bitcoin",
	address: "17uDfp5r4n441xkgLFmhNoSW1KWp6xVLD",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(133),
	prize: 13.3,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .133),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.197),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 11.97)
	]
});
const bits134 = puzzle({
	id: "bits/134",
	chain: "bitcoin",
	address: "13A3JrvXmvg5w9XGvyyR4JEJqiLz8ZySY3",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(134),
	prize: 13.4,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .134),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.206),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.06)
	]
});
const bits135 = puzzle({
	id: "bits/135",
	chain: "bitcoin",
	address: "16RGFo6hjq9ym6Pj7N5H7L1NR1rVPJyw2v",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Solved,
	pubkey: compressed("02145d2611c823a396ef6712ce0f712f09b9b4f3135e3e0aa3230fb9b6d08d1e16"),
	key: hex("0000000000000000000000000000006d9392a16883f90903d5f78da57af07eb2", 135).wif("KwDiBf89QgGbjEhKnhXJuHd5nqdUrAnYX4EBqgA3Lxm2rHQuQMih"),
	prize: 13.500034,
	solvedAt: "2026-07-28 08:20:16",
	solveTime: 363881582,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .135),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.215),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.15),
		increase("e876a49f4f04d687b0b227bf554fbf1878289288291d17339413dd287af27c64", "2024-10-09 14:58:21", 2208e-8),
		increase("32ea2049816f4bc776a2152bff801a32582d75287d0d79b6b4388b5ba7527fb8", "2025-01-28 02:11:50", 6e-6),
		increase("3f2ec8791ec73c2216bf1dba98d79624c30bc9bf86abc314404eeec87d43f0c0", "2025-03-30 01:49:24", 6e-6),
		claim("817535430c600810080662dd425a2e335f771effd950d28fc443bce4a92fa812", "2026-07-28 08:20:16", 13.5),
		claim("840d3ed5183fd1309c364d5f5a71a9686e78b24ec2e8a502062fc5a9258a9ba7", "2026-07-29 19:35:34", 3408e-8)
	],
	solver: party("RetiredCoder", {
		key: "retired-coder",
		kind: PartyKind.Person,
		about: "Author of RCKangaroo, an open source Pollard kangaroo solver for Nvidia GPUs, who took four of the puzzle transaction's keys and then retired from the race.",
		addresses: ["3Emiwzxme7Mrj4d89uqohXNncnRM15YESs", "1Prestige1zSYorBdz94KA2UbJW3hYLTn4"],
		profiles: [profile("github", "https://github.com/RetiredC"), profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=3657819")],
		facts: [
			fact("The GitHub profile says: I've solved 134-bit range point on Secp256k1 (Bitcoin challenges #120, #125, #130, #135). Probably, it's a world record.", "https://github.com/RetiredC"),
			fact("Publishes RCKangaroo, a CUDA implementation of Pollard's kangaroo method with symmetry that solves the discrete log in a known range.", "https://github.com/RetiredC/RCKangaroo"),
			fact("Announced #135 on bitcointalk: about 5 months on 200 GPUs, and I quit, officially.", "https://bitcointalk.org/index.php?topic=5517607.msg66986617#msg66986617", { date: "2026-07-28" }),
			fact("Released RCKangaroo v4.0 with the ASM turbo kernels the same day, calling its main loop without inversions the Triple Montgomery trick.", "https://bitcointalk.org/index.php?topic=5517607.msg66986810#msg66986810", { date: "2026-07-28" }),
			fact("Said the run paid, but never again: it was too boring to pay bills for five months.", "https://bitcointalk.org/index.php?topic=5517607.msg66987408#msg66987408", { date: "2026-07-28" })
		]
	})
});
const bits136 = puzzle({
	id: "bits/136",
	chain: "bitcoin",
	address: "1UDHPdovvR985NrWSkdWQDEQ1xuRiTALq",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(136),
	prize: 13.6,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .136),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.224),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.24)
	]
});
const bits137 = puzzle({
	id: "bits/137",
	chain: "bitcoin",
	address: "15nf31J46iLuK1ZkTnqHo7WgN5cARFK3RA",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(137),
	prize: 13.7,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .137),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.233),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.33)
	]
});
const bits138 = puzzle({
	id: "bits/138",
	chain: "bitcoin",
	address: "1Ab4vzG6wEQBDNQM1B2bvUz4fqXXdFk2WT",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(138),
	prize: 13.8,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .138),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.242),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.42)
	]
});
const bits139 = puzzle({
	id: "bits/139",
	chain: "bitcoin",
	address: "1Fz63c775VV9fNyj25d9Xfw3YHE6sKCxbt",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(139),
	prize: 13.9,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .139),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.251),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.51)
	]
});
const bits140 = puzzle({
	id: "bits/140",
	chain: "bitcoin",
	address: "1QKBaU6WAeycb3DbKbLBkX7vJiaS8r42Xo",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	pubkey: compressed("031f6a332d3c5c4f2de2378c012f429cd109ba07d69690c6c701b6bb87860d6640"),
	key: bits$1(140),
	prize: 14.000016,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .14),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.26),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("d8c38d06fe7ea6adf44c5cc2cbf50083ec9cd8a3fc6c537e8d39db30639e8a77", "2022-11-19 17:06:31", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.6),
		increase("dd23b1079095ec6821f003b5a1acd5942152f478411157d717c8bddf8f67fb94", "2025-01-28 07:26:00", 6e-6)
	]
});
const bits141 = puzzle({
	id: "bits/141",
	chain: "bitcoin",
	address: "1CD91Vm97mLQvXhrnoMChhJx4TP9MaQkJo",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(141),
	prize: 14.10014846,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .141),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.269),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.69),
		increase("51fd194a442ad0955b0fc4a0f725d50c196c1b09c6c1d64699b8e48c3880a15e", "2024-12-11 23:00:49", 5924e-8),
		increase("1bfba1dc3d340b4c4b416f9c1e5c5df4c13324e49113624dc2639941043a8fda", "2024-12-12 00:52:52", 8922e-8)
	]
});
const bits142 = puzzle({
	id: "bits/142",
	chain: "bitcoin",
	address: "15MnK2jXPqTMURX4xC3h4mAZxyCcaWWEDD",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(142),
	prize: 14.2,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .142),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.278),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.78)
	]
});
const bits143 = puzzle({
	id: "bits/143",
	chain: "bitcoin",
	address: "13N66gCzWWHEZBxhVxG18P8wyjEWF9Yoi1",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(143),
	prize: 14.3,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .143),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.287),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.87)
	]
});
const bits144 = puzzle({
	id: "bits/144",
	chain: "bitcoin",
	address: "1NevxKDYuDcCh1ZMMi6ftmWwGrZKC6j7Ux",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(144),
	prize: 14.4,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .144),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.296),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 12.96)
	]
});
const bits145 = puzzle({
	id: "bits/145",
	chain: "bitcoin",
	address: "19GpszRNUej5yYqxXoLnbZWKew3KdVLkXg",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	pubkey: compressed("03afdda497369e219a2c1c369954a930e4d3740968e5e4352475bcffce3140dae5"),
	key: bits$1(145),
	prize: 14.500006,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .145),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.305),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.05),
		increase("35c62ac2e2118aea9167f918670ea9e60e4c82029da01b33f82756372faa53e7", "2025-01-28 03:11:55", 6e-6)
	]
});
const bits146 = puzzle({
	id: "bits/146",
	chain: "bitcoin",
	address: "1M7ipcdYHey2Y5RZM34MBbpugghmjaV89P",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(146),
	prize: 14.6,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .146),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.314),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.14)
	]
});
const bits147 = puzzle({
	id: "bits/147",
	chain: "bitcoin",
	address: "18aNhurEAJsw6BAgtANpexk5ob1aGTwSeL",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(147),
	prize: 14.7,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .147),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.323),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.23)
	]
});
const bits148 = puzzle({
	id: "bits/148",
	chain: "bitcoin",
	address: "1FwZXt6EpRT7Fkndzv6K4b4DFoT4trbMrV",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(148),
	prize: 14.8,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .148),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.332),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.32)
	]
});
const bits149 = puzzle({
	id: "bits/149",
	chain: "bitcoin",
	address: "1CXvTzR6qv8wJ7eprzUKeWxyGcHwDYP1i2",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(149),
	prize: 14.90001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .149),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.341),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.41)
	]
});
const bits150 = puzzle({
	id: "bits/150",
	chain: "bitcoin",
	address: "1MUJSJYtGPVGkBCTqGspnxyHahpt5Te8jy",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	pubkey: compressed("03137807790ea7dc6e97901c2bc87411f45ed74a5629315c4e4b03a0a102250c49"),
	key: bits$1(150),
	prize: 15.000016,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .15),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.35),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.5),
		increase("284ef13f3a81cb301fa1bf570f2cdfeb27d8d93140b9a14950a1a5769ac60071", "2025-01-27 14:15:16", 6e-6)
	]
});
const bits151 = puzzle({
	id: "bits/151",
	chain: "bitcoin",
	address: "13Q84TNNvgcL3HJiqQPvyBb9m4hxjS3jkV",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(151),
	prize: 15.10001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .151),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.359),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.59)
	]
});
const bits152 = puzzle({
	id: "bits/152",
	chain: "bitcoin",
	address: "1LuUHyrQr8PKSvbcY1v1PiuGuqFjWpDumN",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(152),
	prize: 15.20001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .152),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.368),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.68)
	]
});
const bits153 = puzzle({
	id: "bits/153",
	chain: "bitcoin",
	address: "18192XpzzdDi2K11QVHR7td2HcPS6Qs5vg",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(153),
	prize: 15.30001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .153),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.377),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.77)
	]
});
const bits154 = puzzle({
	id: "bits/154",
	chain: "bitcoin",
	address: "1NgVmsCCJaKLzGyKLFJfVequnFW9ZvnMLN",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(154),
	prize: 15.40001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .154),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.386),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.86)
	]
});
const bits155 = puzzle({
	id: "bits/155",
	chain: "bitcoin",
	address: "1AoeP37TmHdFh8uN72fu9AqgtLrUwcv2wJ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	pubkey: compressed("035cd1854cae45391ca4ec428cc7e6c7d9984424b954209a8eea197b9e364c05f6"),
	key: bits$1(155),
	prize: 15.500116,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .155),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.395),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 13.95),
		increase("ddf0c3de51e34363c756e5850f4a2fc1b9af8dcb76a2d7f9e61cebc5526e95de", "2025-01-28 07:26:42", 6e-6),
		increase("21f8ff5f3bd280004239e4b0c4a4e82f2e8919cf91245800656cf2bb7ec25aa0", "2025-05-02 13:12:32", 1e-4)
	]
});
const bits156 = puzzle({
	id: "bits/156",
	chain: "bitcoin",
	address: "1FTpAbQa4h8trvhQXjXnmNhqdiGBd1oraE",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(156),
	prize: 15.60001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .156),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.404),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 14.04)
	]
});
const bits157 = puzzle({
	id: "bits/157",
	chain: "bitcoin",
	address: "14JHoRAdmJg3XR4RjMDh6Wed6ft6hzbQe9",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(157),
	prize: 15.70001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .157),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.413),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 14.13)
	]
});
const bits158 = puzzle({
	id: "bits/158",
	chain: "bitcoin",
	address: "19z6waranEf8CcP8FqNgdwUe1QRxvUNKBG",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(158),
	prize: 15.80001,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .158),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.422),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 14.22)
	]
});
const bits159 = puzzle({
	id: "bits/159",
	chain: "bitcoin",
	address: "14u4nA5sugaswb6SZgn5av2vuChdMnD9E5",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	key: bits$1(159),
	prize: 15.900026,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .159),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.431),
		increase("e1f668b8cc9915fcd3de6ec922acf98cdf4c14f75de9530b6ad750693d44076b", "2021-08-19 15:55:55", 1e-5),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 14.31),
		increase("a22040a32e5f5772ff9def5c371150e03ac4a5736bad0df527063882f03ac8cc", "2024-07-13 19:07:25", 1e-5),
		increase("5603c7ee6b025c823009b28e4ccb476e72eec94ef202155cfbc10f5cc94ea697", "2025-01-28 07:26:42", 6e-6)
	]
});
const bits160 = puzzle({
	id: "bits/160",
	chain: "bitcoin",
	address: "1NBC8uXJy1GiJ6drkiZa1WuKn51ps7EPTv",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	pubkey: compressed("02e0a8b039282faf6fe0fd769cfbc4b6b4cf8758ba68220eac420e32b91ddfa673"),
	key: bits$1(160),
	prize: 16.00119082,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .16),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.44),
		increase("336043f3a5f08e4f08dc25bf7ae61aa74d008641a55e4a8e37d2a71a2d0fbd65", "2019-02-24 21:48:34", 793e-8),
		increase("7c432398c7631600af01695c9767eff109cbfae4f7ecccaff388043a474d4f1e", "2019-05-16 04:25:45", 1e-5),
		pubkeyReveal("17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3", "2019-06-01 02:07:26", 1e-5),
		increase("6b2f1287b8e6f9b4394977a2d389313647ef0f004d6ef0f752a03d014a10a021", "2022-11-14 13:12:25", 15e-6),
		increase("12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3", "2023-04-16 06:29:48", 14.4),
		increase("f28d7dda479bc61ac34fc762226634e51135b6a6609b2a774e1e4495f9f996ed", "2023-09-25 15:00:17", 3768e-8),
		increase("d864c1a02f3ba7028d4a0723bc64102b04d3afea7e2a114e2d6db515489750ff", "2023-10-23 08:45:40", 6e-6),
		increase("4cab5e1213071d60d6e452a6b4e9caefbbae44611c3dc2bd757a639a1f85fdd2", "2024-06-29 08:18:58", 821e-8),
		increase("9ad34108526a0491386df4055dae20456551288aba2a8893fccdd6842ab29f7e", "2024-07-13 16:22:21", 1e-4),
		increase("e2e8e1988044d6195dc6f076a9d5810eec4f3493667b536ddec898dcacc10d4f", "2024-07-13 19:07:25", 1e-5),
		increase("65ef98ecd6392c4add3fd280f322baa252b697a1b1ab240db0876f004a88a405", "2025-01-09 18:32:51", 6e-6),
		increase("ae3c5d4277175a604a125f7b4461a083ca1a4dcfd5110b4c77ee773dea7a6877", "2025-05-02 09:59:40", .001)
	]
});
const bits161 = puzzle({
	id: "bits/161",
	chain: "bitcoin",
	address: "1JkqBQcC4tHcb1JfdCH6nrWYwTPGznHANh",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("031dcf49b480cee5f1a7200ea94795a1c7f69e144f11f031123c14c65077823dcb"),
	key: bits$1(161),
	prize: .161,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .161), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .161)]
});
const bits162 = puzzle({
	id: "bits/162",
	chain: "bitcoin",
	address: "17DTUTXUcUYEgrr5GhivxYei4Lrs1xMnS2",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03294d33f5e7b98c885ff540fd3f747010999f640d8fdb021f5a13ef3d06c36a58"),
	key: bits$1(162),
	prize: .162,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .162), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .162)]
});
const bits163 = puzzle({
	id: "bits/163",
	chain: "bitcoin",
	address: "1H6e7SLxv6ZUbuAaZpeUdVNfh3cKBWJRmx",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02ee740ba74efc08bf39d01ccb7e34f50afe2f4677a9e09755e7fe3808e0cbbac9"),
	key: bits$1(163),
	prize: .163,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .163), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .163)]
});
const bits164 = puzzle({
	id: "bits/164",
	chain: "bitcoin",
	address: "1LjQKurNtEDgMdqeCoWRFhHp1FPnLU77Q4",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0312163c60548244d6e565bd877b98808b73830c537efde357c8b5f8c623fb2028"),
	key: bits$1(164),
	prize: .164,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .164), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .164)]
});
const bits165 = puzzle({
	id: "bits/165",
	chain: "bitcoin",
	address: "1F7ZjibYug9bLW3YvkkwBZLrhfLtNjgYrX",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("037c6fcde6a2e0fd57ce21bb4352f7bb38859d2af5388b27ebfed107907e060c5c"),
	key: bits$1(165),
	prize: .165,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .165), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .165)]
});
const bits166 = puzzle({
	id: "bits/166",
	chain: "bitcoin",
	address: "12BtvPaamiBCpXmoDrsCxAa1b6hMRnASZ4",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02b02f753542201387815c4754b66202ef6dc4b3415e4c4cc826d6534394702f50"),
	key: bits$1(166),
	prize: .166,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .166), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .166)]
});
const bits167 = puzzle({
	id: "bits/167",
	chain: "bitcoin",
	address: "1AvLwGpkwTZH4qiwy1L4v6TuWXLMNrATN5",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03779c01b4badc5c3883f6ea2b93214a24796154c8eb967695dfc802bf074b4941"),
	key: bits$1(167),
	prize: .167,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .167), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .167)]
});
const bits168 = puzzle({
	id: "bits/168",
	chain: "bitcoin",
	address: "1PojqbbzJHnn1X2mv6DCECNLUaD2nMssDp",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02788f82521d7557d30c9c4f8bc7098cda23c59729e9cf96057ea1dc49799bd399"),
	key: bits$1(168),
	prize: .168,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .168), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .168)]
});
const bits169 = puzzle({
	id: "bits/169",
	chain: "bitcoin",
	address: "1G3uazv67BcKRmPFvgvX4ijBTa2898cvCm",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("026efbd90dfd84d5bfb7a8ceb2755155d1d39a16be88db336ff18a8d844a269cba"),
	key: bits$1(169),
	prize: .169,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .169), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .169)]
});
const bits170 = puzzle({
	id: "bits/170",
	chain: "bitcoin",
	address: "1EW9W5sGdxVDxAtjRbCjgkZNtPH8ZzikeP",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03e56c48f1bc4a6d06a2e0a4ad53c7674403dbfdaaeee3ecc86aff294b04997d61"),
	key: bits$1(170),
	prize: .17,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .17), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .17)]
});
const bits171 = puzzle({
	id: "bits/171",
	chain: "bitcoin",
	address: "17zzMMnj5h8StLhnrXpw8iBP21uujNC4Ap",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("021b6f7d2e3d33f99fa44985c68ae85827282c64701a2c663bd81e18a229a3562d"),
	key: bits$1(171),
	prize: .171,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .171), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .171)]
});
const bits172 = puzzle({
	id: "bits/172",
	chain: "bitcoin",
	address: "15LJKhwQJ7dYMBZX1mktskZqxX1aUCibkr",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02ed75f534f534c536d0732acd70af3e0d173c1f6885381edf8469d1e5a4cae716"),
	key: bits$1(172),
	prize: .172,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .172), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .172)]
});
const bits173 = puzzle({
	id: "bits/173",
	chain: "bitcoin",
	address: "1Mkodin3C3drVaV9JNk1o3i4n4gVGe9GVx",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0233d5bd5790203edab5c63839bee1765735c35254ec24f3073f65d99e1dabf90e"),
	key: bits$1(173),
	prize: .173,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .173), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .173)]
});
const bits174 = puzzle({
	id: "bits/174",
	chain: "bitcoin",
	address: "1C6dHU1gQtVUXZmeXQuQc3EgDJbiLbxFZJ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03c11209f91946eb81b603d046a296f5754967897d471980fe43ea1aec8bf2ad7c"),
	key: bits$1(174),
	prize: .174,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .174), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .174)]
});
const bits175 = puzzle({
	id: "bits/175",
	chain: "bitcoin",
	address: "1DxZJy7AkqLVAQ5rtSUKfrR3yPE5u5ygk6",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02cb5f1f0d3dd67f0f162353490d98219982f5095bd32daa6c020806cf59ea2c2e"),
	key: bits$1(175),
	prize: .175,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .175), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .175)]
});
const bits176 = puzzle({
	id: "bits/176",
	chain: "bitcoin",
	address: "1NcytLwdqJa8DsQPa9NwkxJTQcx1rZy85A",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02ba9f479c758f5b2842ddef8414e70acfc943d2584258709352061a100e410ee4"),
	key: bits$1(176),
	prize: .176,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .176), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .176)]
});
const bits177 = puzzle({
	id: "bits/177",
	chain: "bitcoin",
	address: "163vG9mKmAsrvmq42MBDPjf9axZyEgBc9R",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("028ae59ec009a07fad636a066f72d567a1fe9a37492b40688c2edfe18de00f284c"),
	key: bits$1(177),
	prize: .177,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .177), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .177)]
});
const bits178 = puzzle({
	id: "bits/178",
	chain: "bitcoin",
	address: "12ATwA5VvoPDinSymcQpCAXPLApAVLN24z",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("035fd8708ca357691c50a49b0d339227360049b3156c3d32d1c54a315393bda35e"),
	key: bits$1(178),
	prize: .178,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .178), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .178)]
});
const bits179 = puzzle({
	id: "bits/179",
	chain: "bitcoin",
	address: "12fXbBE7kTfqYk8dYyU9bw7XfKVwEqXnzg",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02064bbc39fd98afca5085c5e9a006c8bb0e466adef24a911e635f835c8061c15f"),
	key: bits$1(179),
	prize: .179,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .179), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .179)]
});
const bits180 = puzzle({
	id: "bits/180",
	chain: "bitcoin",
	address: "1EkYsB1C7deWxiVUULeZpr42AdYWhv4PEX",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0329420514190479e81640f967e686e2d950e231edd021fc63a17193dac2969a3d"),
	key: bits$1(180),
	prize: .18,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .18), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .18)]
});
const bits181 = puzzle({
	id: "bits/181",
	chain: "bitcoin",
	address: "1MPQyhXBT2FpUMCiv5YX3yacKvmc9P5x6S",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02cd62a1cefed68821c2fc3a0e763a0178a323cfba08cde5c0321caa644f1052de"),
	key: bits$1(181),
	prize: .181,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .181), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .181)]
});
const bits182 = puzzle({
	id: "bits/182",
	chain: "bitcoin",
	address: "1GZyxmpgtRJNaW1zEhPAa81xZDEJSdwbbZ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03f7aafd4bcc8478efb01ff830655d88cb60399e3179e24eb0146b013ee5c4d6a1"),
	key: bits$1(182),
	prize: .182,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .182), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .182)]
});
const bits183 = puzzle({
	id: "bits/183",
	chain: "bitcoin",
	address: "12E2HWQVHzuGKAQVvPUkHWwibAJfnmcHW1",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("036d249dae9d1f3afe5c85ec6f34561a2373d6c0b6cfa8ca1b4ae00d1937e7a59b"),
	key: bits$1(183),
	prize: .183,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .183), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .183)]
});
const bits184 = puzzle({
	id: "bits/184",
	chain: "bitcoin",
	address: "14J1fXY2E3fbxjp1zpfqRhk5BNQ4pb97Rs",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0377059f597c2e14d648807db27c8540f7cdd7e176c5baf979dcc00f251bdec6aa"),
	key: bits$1(184),
	prize: .184,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .184), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .184)]
});
const bits185 = puzzle({
	id: "bits/185",
	chain: "bitcoin",
	address: "1HqHHuFzZhtTtyGbAWCS49qGnCBSEhBSFT",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0208ce81549c729647d7747a6a7e304104435fae445afb4fa90fd384f2640f0ed9"),
	key: bits$1(185),
	prize: .185,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .185), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .185)]
});
const bits186 = puzzle({
	id: "bits/186",
	chain: "bitcoin",
	address: "1BJXBDt4e1uaorXPototucUGNRme57nAqt",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03ab1c8c3d6b773758c2a765dd33fa0b9804c55754f9a9278a158a2d02a6edd1a6"),
	key: bits$1(186),
	prize: .186,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .186), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .186)]
});
const bits187 = puzzle({
	id: "bits/187",
	chain: "bitcoin",
	address: "19ct7Egfi5j6jSefj8X4d5eXJQUmyhtXjC",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("028393d6e394d960b1b7e239707d87595f85b7bdca480dafd39d4797124740d9ef"),
	key: bits$1(187),
	prize: .187,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .187), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .187)]
});
const bits188 = puzzle({
	id: "bits/188",
	chain: "bitcoin",
	address: "1DyWSY1dA3wyjo4eMuQCPfrm3dV96xDDSU",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("039705ff013b8514ee6eded8af52879598d19306f3e252f153dbfa02baa06d7dde"),
	key: bits$1(188),
	prize: .188,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .188), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .188)]
});
const bits189 = puzzle({
	id: "bits/189",
	chain: "bitcoin",
	address: "1PiLrDyeXtncnsvcVAGGcNnpzQVRCG3fwS",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("027a9e387d83df7847566373ef601f2b6dd9adbaf3fde5582199ed71f4b8ca9e08"),
	key: bits$1(189),
	prize: .189,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .189), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .189)]
});
const bits190 = puzzle({
	id: "bits/190",
	chain: "bitcoin",
	address: "1HUoYzoEn2a4WxKvnYYbnR9GKrVqAfq7oY",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03eb37cc02df3bd83f67e581116b2e08b1b4f27354a21d6345fe17484f4ba2ab8a"),
	key: bits$1(190),
	prize: .19,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .19), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .19)]
});
const bits191 = puzzle({
	id: "bits/191",
	chain: "bitcoin",
	address: "19vnME8b28SzJDuEFNShAG5JCR63V1zzV",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03bd9d14ad1d7d2c3d1f46b5f2c82142a5c0784ff4506c04ae0a99d9737e1630d1"),
	key: bits$1(191),
	prize: .191,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .191), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .191)]
});
const bits192 = puzzle({
	id: "bits/192",
	chain: "bitcoin",
	address: "1GWTEv76C8cusq4h5gV3rLjeFhBkGBHSKg",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("024e1799de117b044ea4778a77f0a6267bb84b182f55093be7ed0e8f703b74e5bd"),
	key: bits$1(192),
	prize: .192,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .192), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .192)]
});
const bits193 = puzzle({
	id: "bits/193",
	chain: "bitcoin",
	address: "1NHh2fQDm7KyBs8HRFkVtHgMzkmufk6mNW",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02a7cbaf2cc78bf6686b7a2a2cbcd2d0ed6e03e56f481e18212508364b682ca711"),
	key: bits$1(193),
	prize: .193,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .193), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .193)]
});
const bits194 = puzzle({
	id: "bits/194",
	chain: "bitcoin",
	address: "1oW8VFRNVKhbzzq8NWNutDYDzv1CzAHAj",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("024e951c7b8d0630a84f5f79b6a8ddae01ff2166f322fc4558d20c97aacd8f2839"),
	key: bits$1(194),
	prize: .194,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .194), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .194)]
});
const bits195 = puzzle({
	id: "bits/195",
	chain: "bitcoin",
	address: "16q15tpaHQFUENUmRPLgiidCMWLcDpVEgs",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("029cfb4b5b2830188161b359fc1fb7ef3023b3212889ee8565a7989de774af192d"),
	key: bits$1(195),
	prize: .195,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .195), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .195)]
});
const bits196 = puzzle({
	id: "bits/196",
	chain: "bitcoin",
	address: "1AH4d8Bss6eFyugZaN2qPXMBH69T946dSK",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02e56e407ea984475f21ee82e96822c541967dae2a68e85ef883ec46c7646d6f67"),
	key: bits$1(196),
	prize: .196,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .196), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .196)]
});
const bits197 = puzzle({
	id: "bits/197",
	chain: "bitcoin",
	address: "12gDPuHvZBh6FSjyhHhyDDkM38Y2wyDGQt",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("028ab0a2c3a3413f9ea995a2bd5c7a72b79b2c6f76bf7cf49d840028a618046fd3"),
	key: bits$1(197),
	prize: .197,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .197), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .197)]
});
const bits198 = puzzle({
	id: "bits/198",
	chain: "bitcoin",
	address: "12jFRwZFUrxUTtuyVzw9FNJsJa7mjBgfca",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0245f61026852cde2db15de4b129ad0e3c54aba03ed9b0f676eb9dfb680277d569"),
	key: bits$1(198),
	prize: .198,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .198), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .198)]
});
const bits199 = puzzle({
	id: "bits/199",
	chain: "bitcoin",
	address: "1BNkFNU3eJz8jDfTkTwe7XmF18BfQwfqW7",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03ec5cd862b5699f09e5341b4315b2a548024718fe9ce70d205dbfbbface07d7ee"),
	key: bits$1(199),
	prize: .199,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .199), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .199)]
});
const bits200 = puzzle({
	id: "bits/200",
	chain: "bitcoin",
	address: "1DEDEKJVEmXvEqwg3wbq8c1ZNobo4tNw4h",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03fe993e313ad3c5e8ae4d7e99a8cd5131ae04896270e48082d5965dba9616032d"),
	key: bits$1(200),
	prize: .2,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .2), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .2)]
});
const bits201 = puzzle({
	id: "bits/201",
	chain: "bitcoin",
	address: "1DA2RexqNkbVhzfkmQDHRMfKrdesgyMMdQ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03346fd1b1ca7a7eb88e4b7af48d678a42e8ca8d607d8e4e2967d16394c360d014"),
	key: bits$1(201),
	prize: .201,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .201), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .201)]
});
const bits202 = puzzle({
	id: "bits/202",
	chain: "bitcoin",
	address: "19Ho5YB6y8qRCdUMxWpXqrm8N4AKAq7ZWS",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02669d985185d1894541f6ab7ea7fd57dace5bf97f2c73736b205ab07a5685354b"),
	key: bits$1(202),
	prize: .202,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .202), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .202)]
});
const bits203 = puzzle({
	id: "bits/203",
	chain: "bitcoin",
	address: "1DVWn7PuRBmsdTBKiboBdSREHdAtSoN6BB",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("034fd997afbe4608f743661ae417c5706b044d9d5532a51aef5f4cb244f5f5dce1"),
	key: bits$1(203),
	prize: .203,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .203), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .203)]
});
const bits204 = puzzle({
	id: "bits/204",
	chain: "bitcoin",
	address: "14CMU6qvv55Y7xJdVw64ey5yfUP4BZAjct",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("038e2790adcbe6d0c89c0c23763c52608ad0fe2a757e9910550f45bfb1855ad54c"),
	key: bits$1(204),
	prize: .204,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .204), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .204)]
});
const bits205 = puzzle({
	id: "bits/205",
	chain: "bitcoin",
	address: "1DHL5NuXPjwDsNnXyzAgZTAMM4aYUc1zFW",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("030fad8d46d7a7f4e5b5c76a09a05166c8f7515651f0c73bf8329353f412699c99"),
	key: bits$1(205),
	prize: .205,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .205), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .205)]
});
const bits206 = puzzle({
	id: "bits/206",
	chain: "bitcoin",
	address: "1UwsEPMF1NZTWJAuymsLVJpqetBZ3Q9sJ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0291a1ff9572bcbafd8dabe85c90e10a458a4f71e759747918d4aa1f56af8a66af"),
	key: bits$1(206),
	prize: .206,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .206), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .206)]
});
const bits207 = puzzle({
	id: "bits/207",
	chain: "bitcoin",
	address: "16aELF1f75o464ZhtAZUwbc4ctFQZxS8qi",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("030fb4b479aaa51c07c2f660501ccf73a6aaef84e2065ad1dcf97125a5d7248258"),
	key: bits$1(207),
	prize: .207,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .207), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .207)]
});
const bits208 = puzzle({
	id: "bits/208",
	chain: "bitcoin",
	address: "15TJ3wPvdviupvKQFm8hLeXSzeMSq7LSJ2",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03762e52fe281f880581dcd00bf80a7fd949af3439b479aba16b6fa5b04733f4b4"),
	key: bits$1(208),
	prize: .208,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .208), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .208)]
});
const bits209 = puzzle({
	id: "bits/209",
	chain: "bitcoin",
	address: "1JgrGoQbvJS7UnX6j4myiCxo6Q3gyo5Ujk",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0243874c891b55668295d5fb6a734fa8b9c4f73eb80cd4f3be3ed7de520e974e9f"),
	key: bits$1(209),
	prize: .209,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .209), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .209)]
});
const bits210 = puzzle({
	id: "bits/210",
	chain: "bitcoin",
	address: "14Xm5DjBUQTJCzeGhyrhVsxkK8p35srk1S",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03628e54188ca8c8c0b73fdb12064f195417f9fd98a7b0763d83eda2518c526f44"),
	key: bits$1(210),
	prize: .21,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .21), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .21)]
});
const bits211 = puzzle({
	id: "bits/211",
	chain: "bitcoin",
	address: "19yhSoza8oK3ioCSydMuAGJs4Mm3FwCTht",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("036f164c6a628d94338a9dc9dfc1cc2f91a3a9382c198bb05f51fbbc34c6cc583e"),
	key: bits$1(211),
	prize: .211,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .211), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .211)]
});
const bits212 = puzzle({
	id: "bits/212",
	chain: "bitcoin",
	address: "1JXw9i8dEZGH29mUiuKjWXK9L27r2TerLQ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("020df4abc8bae9c000ea2357b014befe3e6d13dd63951ac0b2b66b37eab76b7ead"),
	key: bits$1(212),
	prize: .212,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .212), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .212)]
});
const bits213 = puzzle({
	id: "bits/213",
	chain: "bitcoin",
	address: "1CNNth43uiVypxHmZLC8hWZsb7UiP7wSkY",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("024b5c68b748907bc07afa2f4d9cfeef5524d0675ee4b5a39f2e9e7b7b85f2bd9f"),
	key: bits$1(213),
	prize: .213,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .213), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .213)]
});
const bits214 = puzzle({
	id: "bits/214",
	chain: "bitcoin",
	address: "16ocVeZDpqcvyMvzAH1r2LR75uEzRhkyV2",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("033fb8f6eb9cd60aca4f5ec48c7bd81fbe2c221c7701bcb93be5f50a810055c965"),
	key: bits$1(214),
	prize: .214,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .214), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .214)]
});
const bits215 = puzzle({
	id: "bits/215",
	chain: "bitcoin",
	address: "15x3tRVyn9SRaxfbFUzqETmCJiz46Vs247",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02dcab1861d56d3b6ca4d741f885c9f7b34d91b460f90b3dc1983acf701ca8092f"),
	key: bits$1(215),
	prize: .215,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .215), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .215)]
});
const bits216 = puzzle({
	id: "bits/216",
	chain: "bitcoin",
	address: "197K7MdYhnN88gcJouJRxMiSAHHfWuPrXC",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("022f02cc3458301883c9bd15fe341384f94ce48076f836815f7b89901f3a27abc4"),
	key: bits$1(216),
	prize: .216,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .216), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .216)]
});
const bits217 = puzzle({
	id: "bits/217",
	chain: "bitcoin",
	address: "1MDsNYfC4LErgwUDqfQ5BgFJqv5bs4Frkn",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("023dccddd7460b8000e6ac7bb14f98cad9aeb4b4f858c2a655738ce141d71224fb"),
	key: bits$1(217),
	prize: .217,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .217), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .217)]
});
const bits218 = puzzle({
	id: "bits/218",
	chain: "bitcoin",
	address: "1BDTXmiyyzq9i79RGGTW7cjmYJbxKoV27e",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03d8c17e24c72388998ebe82837a555e57d1db6162738cec8963384c367e393906"),
	key: bits$1(218),
	prize: .218,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .218), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .218)]
});
const bits219 = puzzle({
	id: "bits/219",
	chain: "bitcoin",
	address: "1EiJ59LPWDezXwfAGFTcoEKdNhvRTriBXy",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02ef830a543b3b50c3fc7e42bbc0938039f8d3e19a1e862012f281c51f3581d77d"),
	key: bits$1(219),
	prize: .219,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .219), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .219)]
});
const bits220 = puzzle({
	id: "bits/220",
	chain: "bitcoin",
	address: "1rirV4Y2NxGwKNQNojJhz61jEctni8fvb",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("022cc796d5a8ec2c871640152a0db6ffd2b4ea957c8f5ecf706fbc383fa5ad7696"),
	key: bits$1(220),
	prize: .22,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .22), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .22)]
});
const bits221 = puzzle({
	id: "bits/221",
	chain: "bitcoin",
	address: "1NxgWntAdMugSNFHEXYizYwk3UjxKPxcDF",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("028a874fe6f1ab00358d0b610d536fd67f049c98069eeb35585549250ef9fff4c5"),
	key: bits$1(221),
	prize: .221,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .221), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .221)]
});
const bits222 = puzzle({
	id: "bits/222",
	chain: "bitcoin",
	address: "17A75vEkPPVeY9MMMXUY9M2JUHbbNyVAWC",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("021536a0aa8cdb5061debba4f236d311a570f6de6d483419fa23c147f543765602"),
	key: bits$1(222),
	prize: .222,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .222), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .222)]
});
const bits223 = puzzle({
	id: "bits/223",
	chain: "bitcoin",
	address: "1NUVBXgX35Uax4fpziV7VGMJyji3mUzZbt",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("034cfb3bcb83ed739ecc9abc84f68ffaa430f2d685bebfaf8cefaaabcd2b53d984"),
	key: bits$1(223),
	prize: .223,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .223), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .223)]
});
const bits224 = puzzle({
	id: "bits/224",
	chain: "bitcoin",
	address: "1F6yxcbDzjumeN77DiABMXzPcvtAdnaoPF",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02a1cf7a8cb1bdd05701aa57ef6e5a9ce28950d93e2369d5fa11ec5bdc8d4ce9d1"),
	key: bits$1(224),
	prize: .224,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .224), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .224)]
});
const bits225 = puzzle({
	id: "bits/225",
	chain: "bitcoin",
	address: "16YvGEYhAwjf2duwvH8jbFMfVCnY6XiQTq",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03e1819c7597f314943bf847e6ec36c4c95ac1b3ead9948b90e9a2729357712ff7"),
	key: bits$1(225),
	prize: .225,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .225), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .225)]
});
const bits226 = puzzle({
	id: "bits/226",
	chain: "bitcoin",
	address: "1HtbZg9mPjYcMDMDNyXaFjHX5e7ZPUwWAp",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("020d896eac113fac98c2a4a44b1488087b3b4c2d8f2563d2a41789f0324ad62cc7"),
	key: bits$1(226),
	prize: .226,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .226), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .226)]
});
const bits227 = puzzle({
	id: "bits/227",
	chain: "bitcoin",
	address: "15a9nXpjnQzw2o5kmvGyKzv7anZkYFHwdK",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02f73589feb03e8ed1de43cc7748111e2f1d73a2a06679951addeee165d378f23e"),
	key: bits$1(227),
	prize: .227,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .227), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .227)]
});
const bits228 = puzzle({
	id: "bits/228",
	chain: "bitcoin",
	address: "18zsQK8ezT32qCqgLJQMkhqyKNwpCP3JU3",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("037ac4f241f6ba433da340b08a081323a93c0966fca5c0757685005f8396b09628"),
	key: bits$1(228),
	prize: .228,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .228), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .228)]
});
const bits229 = puzzle({
	id: "bits/229",
	chain: "bitcoin",
	address: "1AaBhpTnfCin9nCrai2msXzCHoVmwkAe2N",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("020d64789d26c0363a2f284a1cddad7b6ab7dd41d65d5afe6ce7554214d4666518"),
	key: bits$1(229),
	prize: .229,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .229), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .229)]
});
const bits230 = puzzle({
	id: "bits/230",
	chain: "bitcoin",
	address: "13Jtm1mm33Uke7PbmTBYGNZGU7rXUsVs3e",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0216dc9de7fd808beff7fb3bc63767ef34beb0a51b4daf40151bc346781185ceec"),
	key: bits$1(230),
	prize: .23,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .23), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .23)]
});
const bits231 = puzzle({
	id: "bits/231",
	chain: "bitcoin",
	address: "18aBXRctVrWN9naDGhKrLdZViNfLJfCdbF",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0378a0cae3e8275916f41b25838e45a8f4c8829c3b1b937c1b1749fd77b23177c1"),
	key: bits$1(231),
	prize: .231,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .231), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .231)]
});
const bits232 = puzzle({
	id: "bits/232",
	chain: "bitcoin",
	address: "1MEEjd99pkEyCdiqVSCa8Jqjaun7fsEXaG",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03d9dd7c018dcf2a57a4d6c4299983c631ff8ab32eb72b57cfcf25be5366a9ed21"),
	key: bits$1(232),
	prize: .232,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .232), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .232)]
});
const bits233 = puzzle({
	id: "bits/233",
	chain: "bitcoin",
	address: "1NnefTEeKQQAts37cQHzVx8oPrUu8LWyUK",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("021b6cde6068c69f1156c044dabdf4cf4bef6cc4eb020ff0dc74e03633f72403a8"),
	key: bits$1(233),
	prize: .233,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .233), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .233)]
});
const bits234 = puzzle({
	id: "bits/234",
	chain: "bitcoin",
	address: "1FYbLcutmRbvu4yUeLmC4TES2Q3ChhXYY",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02d274968fe3b7f79074b9aad3221d71f42f4c0be9bb3a8e22e20396b9a63a847d"),
	key: bits$1(234),
	prize: .234,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .234), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .234)]
});
const bits235 = puzzle({
	id: "bits/235",
	chain: "bitcoin",
	address: "1Pp61TfkztZ9ckpdeUVCzbyA7vMqXAVsdV",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02df2647ed50cded7c031a702c72b5b09209e5fd4a48c7cee7bf847f88c85bf4bd"),
	key: bits$1(235),
	prize: .235,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .235), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .235)]
});
const bits236 = puzzle({
	id: "bits/236",
	chain: "bitcoin",
	address: "1PytbQzRaf9eTpGax3c6ofKwtbxaLLSNy1",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03e8c806fd610232c5b68d824b3a284e213e523492657965073c54ccaa8a58e8c6"),
	key: bits$1(236),
	prize: .236,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .236), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .236)]
});
const bits237 = puzzle({
	id: "bits/237",
	chain: "bitcoin",
	address: "194bRtNQVRq4xi26UJZYTHexvLXijpzp3e",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0288bc8b2d55ebc48d906478e7c37a78899632543dce63e6a9330a0a0c933e2095"),
	key: bits$1(237),
	prize: .237,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .237), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .237)]
});
const bits238 = puzzle({
	id: "bits/238",
	chain: "bitcoin",
	address: "1DxBvzRMdvzop21DhnDJv4xJDYFGVtu7KZ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("039a1c77eb960be561f622d14ad0de0d2660245e629c1b11033f769aec28270b77"),
	key: bits$1(238),
	prize: .238,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .238), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .238)]
});
const bits239 = puzzle({
	id: "bits/239",
	chain: "bitcoin",
	address: "1QLHLvM6XKwygyWqo2cCPbfbf6woZzGEKH",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02dd983a8c8c8c25d3a16b014ad3e09b8188a3dc0333fc3d4b1504b1d3013b344e"),
	key: bits$1(239),
	prize: .239,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .239), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .239)]
});
const bits240 = puzzle({
	id: "bits/240",
	chain: "bitcoin",
	address: "1C8Hw6T5jypz92cNFr9Lkx4Xmr4DtP7zGA",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03d569cafd2c67ce649d9b3484ae8cd392ad7019f0b7963fac095912d545070466"),
	key: bits$1(240),
	prize: .24,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .24), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .24)]
});
const bits241 = puzzle({
	id: "bits/241",
	chain: "bitcoin",
	address: "1L7ZNx5gFPvdVPfdgFBnEUgA64woQwopqr",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03fbf9615ddcc9c0c9e88fb69ed62465ba694f4694f0ea94a7f3476dbf666ba56d"),
	key: bits$1(241),
	prize: .241,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .241), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .241)]
});
const bits242 = puzzle({
	id: "bits/242",
	chain: "bitcoin",
	address: "1EMhTbC4Kp8DYBk5zoLsTqZ2YakhiTgQYh",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0387d4589510248cb352b5c82d7ee75454c507574cb281042eaf5dee2547abd2b2"),
	key: bits$1(242),
	prize: .242,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .242), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .242)]
});
const bits243 = puzzle({
	id: "bits/243",
	chain: "bitcoin",
	address: "19CqmBBJ3H8FjxSSeSjv2Kn1cVQFXMY6AM",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0243609cd608d2d4744f3b11ff57875067ff2ac9966b87edc24e2daf2c784fc97d"),
	key: bits$1(243),
	prize: .243,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .243), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .243)]
});
const bits244 = puzzle({
	id: "bits/244",
	chain: "bitcoin",
	address: "1KMHDrCGho2QuK59UNvfjuiPdDZSgRbneC",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02eaa8294f7cba1ddf4a990032a2a6d9f07eef4309ab1a27a3446f591efe189314"),
	key: bits$1(244),
	prize: .244,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .244), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .244)]
});
const bits245 = puzzle({
	id: "bits/245",
	chain: "bitcoin",
	address: "1HzpmnHxpu4tCJ23ZS9TfWCoX8mXfpdHiq",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03c763aeffae32371612f8585c10710aaf7bf4a211a632c8a18b969a4f4e42db54"),
	key: bits$1(245),
	prize: .245,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .245), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .245)]
});
const bits246 = puzzle({
	id: "bits/246",
	chain: "bitcoin",
	address: "1LrrNP28PYg1N1z5Uo1gR8cmoPc8h4orBZ",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0396ba2cc3d83caad1a3970670557417e627b7cf32ba4e6219604f8f5e7ca09752"),
	key: bits$1(246),
	prize: .246,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .246), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .246)]
});
const bits247 = puzzle({
	id: "bits/247",
	chain: "bitcoin",
	address: "14D2d3WnHThUxyPhGoj2AabBTxpZcoHy3t",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("03c3f97e2896f15b0dbe0dcf12fe9ef3d62af375d683a4a93761d3f31785971dd3"),
	key: bits$1(247),
	prize: .247,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .247), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .247)]
});
const bits248 = puzzle({
	id: "bits/248",
	chain: "bitcoin",
	address: "18oqrdP6uBKsn57gvmWzLuKMAY4ShapiAU",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("031037fc1784819309a913864372322768fee8ba8c3d3bf0566936096dab4157db"),
	key: bits$1(248),
	prize: .248,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .248), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .248)]
});
const bits249 = puzzle({
	id: "bits/249",
	chain: "bitcoin",
	address: "1Bun4VzuBJ7SUoQn97dinVfDyWAS336Ldg",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02d1d5728abc050fc1c5fefc276616e50573139f89fdd01ac4ce2e52a19f945f8c"),
	key: bits$1(249),
	prize: .249,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .249), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .249)]
});
const bits250 = puzzle({
	id: "bits/250",
	chain: "bitcoin",
	address: "1Ruu3JwvGeSmhQV9GzWAnyLCz6g3evmTY",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0230465312b31af6b26c64d58ebc8a890c41f52f57a5c0eb305d83b0351c4bf968"),
	key: bits$1(250),
	prize: .25,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .25), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .25)]
});
const bits251 = puzzle({
	id: "bits/251",
	chain: "bitcoin",
	address: "1M3u4q5Q35qtQPmDHeubVbk7APYi3VVoBX",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("02ec2ca969860c67210de88b622f37fd4c02488d8ff9cc879ae91405523724eb0e"),
	key: bits$1(251),
	prize: .251,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .251), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .251)]
});
const bits252 = puzzle({
	id: "bits/252",
	chain: "bitcoin",
	address: "1CaTxB3YwmXZkDnTK4rRvq61SRqs48xmui",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0316bbf51b1574f580cd5ec84fe2371b4fd5644637b713f3a795474a1be794001c"),
	key: bits$1(252),
	prize: .252,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .252), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .252)]
});
const bits253 = puzzle({
	id: "bits/253",
	chain: "bitcoin",
	address: "1JqRqUPHHcQu2yrr8JZzxSYDx2jbZxEqFj",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0322ae607614dedc7261f4214dada55f1a0f11926174c3bf1689351c1783f3da48"),
	key: bits$1(253),
	prize: .253,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .253), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .253)]
});
const bits254 = puzzle({
	id: "bits/254",
	chain: "bitcoin",
	address: "1NKkjFvXmovmjwgUujw655n3BbEvnncyza",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("0255d81444d53e97bf282ed8c505a686ca08d270493404c1db86e64b9494ee36cf"),
	key: bits$1(254),
	prize: .254,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .254), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .254)]
});
const bits255 = puzzle({
	id: "bits/255",
	chain: "bitcoin",
	address: "17PEUvQmgqPkkvRkMowoR1wRDXYzre4b9Z",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("030cea4a0ee0a03b7a5f77b85bb455b10979c2220f0e470ce5e0d4e0c786c04f66"),
	key: bits$1(255),
	prize: .255,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .255), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .255)]
});
const bits256 = puzzle({
	id: "bits/256",
	chain: "bitcoin",
	address: "1FMcotmnqqE5M2x9DDX3VfPAPuBWArGisa",
	sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
	startedAt: "2015-01-15 18:07:14",
	status: Status.Swept,
	pubkey: compressed("029125aed5e5342de7c6163a4158a716ac982ba7d2ed85835c6ff99c68702ce710"),
	key: bits$1(256),
	prize: .256,
	transactions: [funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .256), sweep("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", .256)]
});
var BitsCollection = class BitsCollection extends NumericCollection {
	static key = "bits";
	static author = party("saatoshi_rising", {
		key: "saatoshi-rising",
		kind: PartyKind.Person,
		about: "A bitcointalk account that spoke for the puzzle transaction once, in 2017, and never said who was behind it. The rest is on the chain.",
		addresses: [
			"1Czoy8xtddvcGrEhUUCZDQ9QqdRfKh697F",
			"1CENDvi6tmKGrR8RxqwURpX9WHbbKip1db",
			"bc1quksn4yxlxp80tn929gqnh8xpnngqj0fqr99q4z"
		],
		profiles: [profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=991321")],
		facts: [
			fact("The bitcointalk account was registered on 2017-04-27 at 05:43 UTC and posted once, 58 minutes later. Its last activity is dated 2019-06-09.", "https://bitcointalk.org/index.php?action=profile;u=991321", { date: "2017-04-27" }),
			fact("The one post says the keys are consecutive keys from a deterministic wallet, masked with leading zeros to set difficulty, and calls the puzzle a crude measuring instrument of the cracking strength of the community.", "https://bitcointalk.org/index.php?topic=1306983.msg18765941#msg18765941", { date: "2017-04-27" }),
			fact("The 2015 funding came from 1Czoy8xtddvcGrEhUUCZDQ9QqdRfKh697F, which received 32.9 BTC earlier the same day and has not been spent from since.", "https://blockstream.info/tx/08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", { date: "2015-01-15" }),
			fact("The 2017-07-11 sweep spent puzzles 161 to 256 together with 1CENDvi6tmKGrR8RxqwURpX9WHbbKip1db, a wallet funded on the morning of the post, and raised puzzles 51 to 160 tenfold.", "https://blockstream.info/tx/5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", { date: "2017-07-11" })
		]
	});
	static hints = [official("There is no pattern. It is just consecutive keys from a deterministic wallet (masked with leading 000...0001 to set difficulty).", "https://bitcointalk.org/index.php?topic=1306983.msg18765941#msg18765941", confirmation("https://web.archive.org/web/20200509045914/https://bitcointalk.org/index.php?topic=1306983.msg18765941", "Wayback capture of the thread page"), { date: "2017-04-27 06:41:08" })];
	static puzzles = [
		bits1,
		bits2,
		bits3,
		bits4,
		bits5,
		bits6,
		bits7,
		bits8,
		bits9,
		bits10,
		bits11,
		bits12,
		bits13,
		bits14,
		bits15,
		bits16,
		bits17,
		bits18,
		bits19,
		bits20,
		bits21,
		bits22,
		bits23,
		bits24,
		bits25,
		bits26,
		bits27,
		bits28,
		bits29,
		bits30,
		bits31,
		bits32,
		bits33,
		bits34,
		bits35,
		bits36,
		bits37,
		bits38,
		bits39,
		bits40,
		bits41,
		bits42,
		bits43,
		bits44,
		bits45,
		bits46,
		bits47,
		bits48,
		bits49,
		bits50,
		bits51,
		bits52,
		bits53,
		bits54,
		bits55,
		bits56,
		bits57,
		bits58,
		bits59,
		bits60,
		bits61,
		bits62,
		bits63,
		bits64,
		bits65,
		bits66,
		bits67,
		bits68,
		bits69,
		bits70,
		bits71,
		bits72,
		bits73,
		bits74,
		bits75,
		bits76,
		bits77,
		bits78,
		bits79,
		bits80,
		bits81,
		bits82,
		bits83,
		bits84,
		bits85,
		bits86,
		bits87,
		bits88,
		bits89,
		bits90,
		bits91,
		bits92,
		bits93,
		bits94,
		bits95,
		bits96,
		bits97,
		bits98,
		bits99,
		bits100,
		bits101,
		bits102,
		bits103,
		bits104,
		bits105,
		bits106,
		bits107,
		bits108,
		bits109,
		bits110,
		bits111,
		bits112,
		bits113,
		bits114,
		bits115,
		bits116,
		bits117,
		bits118,
		bits119,
		bits120,
		bits121,
		bits122,
		bits123,
		bits124,
		bits125,
		bits126,
		bits127,
		bits128,
		bits129,
		bits130,
		bits131,
		bits132,
		bits133,
		bits134,
		bits135,
		bits136,
		bits137,
		bits138,
		bits139,
		bits140,
		bits141,
		bits142,
		bits143,
		bits144,
		bits145,
		bits146,
		bits147,
		bits148,
		bits149,
		bits150,
		bits151,
		bits152,
		bits153,
		bits154,
		bits155,
		bits156,
		bits157,
		bits158,
		bits159,
		bits160,
		bits161,
		bits162,
		bits163,
		bits164,
		bits165,
		bits166,
		bits167,
		bits168,
		bits169,
		bits170,
		bits171,
		bits172,
		bits173,
		bits174,
		bits175,
		bits176,
		bits177,
		bits178,
		bits179,
		bits180,
		bits181,
		bits182,
		bits183,
		bits184,
		bits185,
		bits186,
		bits187,
		bits188,
		bits189,
		bits190,
		bits191,
		bits192,
		bits193,
		bits194,
		bits195,
		bits196,
		bits197,
		bits198,
		bits199,
		bits200,
		bits201,
		bits202,
		bits203,
		bits204,
		bits205,
		bits206,
		bits207,
		bits208,
		bits209,
		bits210,
		bits211,
		bits212,
		bits213,
		bits214,
		bits215,
		bits216,
		bits217,
		bits218,
		bits219,
		bits220,
		bits221,
		bits222,
		bits223,
		bits224,
		bits225,
		bits226,
		bits227,
		bits228,
		bits229,
		bits230,
		bits231,
		bits232,
		bits233,
		bits234,
		bits235,
		bits236,
		bits237,
		bits238,
		bits239,
		bits240,
		bits241,
		bits242,
		bits243,
		bits244,
		bits245,
		bits246,
		bits247,
		bits248,
		bits249,
		bits250,
		bits251,
		bits252,
		bits253,
		bits254,
		bits255,
		bits256
	];
	static techniques = [technique("masked-key-range", "https://bitcointalk.org/index.php?topic=1306983.msg18765941#msg18765941")];
	constructor() {
		super(BitsCollection.key, BitsCollection.author, BitsCollection.puzzles, BitsCollection.hints, BitsCollection.techniques);
	}
};
const bits = new BitsCollection();
export { BitsCollection, bits };
