import { claim, confirmation, decrease, fact, funding, hex, increase, official, party, profile, technique, uncompressed } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const rushwalletPuzzle1 = puzzle({
	id: "rushwallet/1",
	chain: "bitcoin",
	address: "1NKUXbr2URfQyzREPUzoj4MR4ytF5mEm8u",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("040f5492295b3374ac3d746beb5b1e3629f19e4b7caa228e7d02a1862430e237a7c406b11d339dea846001feb79410a4bd61212f2022538c13cb24b5ad0cb44d52"),
	key: hex("af9a17713338d255ca023b7014c2c9dfcbef656d61a3370156bb804269b74a0d").wif("5K9d6a9ivmDKRe77hnzrSrg2iGkwFuvg1cCGDGBpsgyk6is9U7g").passphrase("5784623964023 578462396402"),
	solvedAt: "2018-01-10 19:55:58",
	solveTime: 104197124,
	transactions: [funding("202f1b15595f3821578fe73bc65a9ce4bcc46011e9481d60a518d471b453a995", "2014-09-22 20:17:14", .025), claim("a904300bbadf6fde7ee6ef273aaa6536899aee5f6f1f27aefa1c56962bd4da14", "2018-01-10 19:55:58", .025)]
});
const rushwalletPuzzle2 = puzzle({
	id: "rushwallet/2",
	chain: "bitcoin",
	address: "1ECmvpGxQWaRf73xxRejJAKEPA57NA77WN",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 17:36:08",
	status: Status.Solved,
	pubkey: uncompressed("04d8e760ace95152182ac423d6e1ecf273dd340004242a305352806ce4d630ee9ed19242ca6c6b43f7adaedf9f67dae3c267f42488ccee6244a2dd18c37984ca39"),
	key: hex("f52279589f480c41864aad5641300b2f92f0cc8488f90339564cfee4f2d1c31e").wif("5KgFDZv8uSJS9mEsyKKs2iyPBfhbGLft8yw8PCoLgh3VugM98jv").passphrase("AGKPX AGKPX AGKPX AGKPX AGKPX AGKPX"),
	solvedAt: "2014-09-23 15:42:08",
	solveTime: 79560,
	transactions: [funding("3a923499b984493a67892aeedf6feb6c230467e72ad9da88e173542e8326dbfe", "2014-09-22 17:36:08", .025), claim("be8f7425ab201b15d2e145436d05e61108ab64002e43b3066af66629b4348823", "2014-09-23 15:42:08", .025)]
});
const rushwalletPuzzle3 = puzzle({
	id: "rushwallet/3",
	chain: "bitcoin",
	address: "1NWexsN7HZjNbmZcpQ8b37LiMSJ3Trvuz5",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("04456ec2ed4201faf57edb6b513caaa0e1a88c160b1e0677c4fb2eb3fe7501617b0a0a723e92bf0740aabae6b5bd2b3115f7b65220787a685715624a798b5d24f6"),
	key: hex("9807a135993ae881d0dc9179ad73a36c6618707a74e25504af0551ab645da0fc").wif("5JyEyivg11jUGPp5R9GE93HmN28rxkXQusBhNTtg9p1PsHWcp3n").passphrase("decentral.ca D.Nakamoto"),
	solvedAt: "2014-09-23 16:40:13",
	solveTime: 73379,
	transactions: [funding("8c8111bc62d562bc445cf97112ac77e5a2894430349d5e9e92e771a6e7f9bd29", "2014-09-22 20:17:14", .025), claim("5668307acaa269b7dbc12ed870866fae290367442e8abdf2f2c594e723da747b", "2014-09-23 16:40:13", .025)]
});
const rushwalletPuzzle4 = puzzle({
	id: "rushwallet/4",
	chain: "bitcoin",
	address: "1Ea5uafoorbr74iw7Xo764x2MKi8BF7uYK",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("04b59099bebdcb23940a81223302234b4b1acc2473d4e116b4d96e9e44e5c9c50a6ff85a4df5d1ca86229ce85007b360e6a0af16fdefa7734e0afd21c0d2f9298d"),
	key: hex("874f1a008f432a402c5bdb0b4374ebda7f120ba57d9edc820d9757d9818b42cb").wif("5JqssJS94cr9ibjFY97p6TD1ehBaFiR3Bhc2DdYgsz4wk6tSVqK").passphrase("The honey badger of money The honey badger of money"),
	solvedAt: "2014-09-23 13:00:27",
	solveTime: 60193,
	transactions: [funding("06378529826fee10c00812603abaabfa352a7226d3d29c06139a35d83098c638", "2014-09-22 20:17:14", .025), claim("534de85113e9cb79ccc8fdb313935599059793733b3aaf35548a2b431f8b04a4", "2014-09-23 13:00:27", .025)]
});
const rushwalletPuzzle5 = puzzle({
	id: "rushwallet/5",
	chain: "bitcoin",
	address: "1Djjzr1bCyys1mkEDf9qDCX9kngRv7MzQM",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("048ba996e8476dee155eddb754da1549954ccfd940404061d9abe788c1b8bfa6f933be0a169620ccd865d8600e0395dc2a54e0b544f7c4f5d1adc2e05b159a8657"),
	key: hex("c0184e16d5bd2c4988897f4c03bd50eacec5d5df1ab8be127ff44b72b5060baa").wif("5KGtPWkqLuEGYnq3nQsbWiP21a4yBN42ujXTub6nxwbhFSQZWc1").passphrase("Bitcoin wallet and tools built right into your browser."),
	solvedAt: "2014-09-23 15:12:09",
	solveTime: 68095,
	transactions: [funding("30afdc625f46bf9c2d6a73cbdf1fe9caffbd8b28555bfea13dbea9d37b37bd16", "2014-09-22 20:17:14", .025), claim("136c4bec93999054e3f4df0097a1debee8f5d7a27eb86f6968178aef8a18b4bf", "2014-09-23 15:12:09", .025)]
});
const rushwalletPuzzle6 = puzzle({
	id: "rushwallet/6",
	chain: "bitcoin",
	address: "1MFUVBapEBURA3jT9TGNCJQyAChqbYrvvf",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("04b02b822cd3d224ce405e0682fccde6805cad430252e4d29fad73ed752b56d946587072d39c8cc0f1693e0dd3be23c53ba01d3921603f1c72a6a29bc4abb5e22a"),
	key: hex("305c10eb89edbd0e35d7359362ed18d3ee5b0df7fd6a6c400002dbfeefe2e950").wif("5JBas2qrscDAMPao26kM9amYP8JYpooWYEKy5kYpptfgNErVjy8").passphrase("this is a rushwallet brainwallet"),
	solvedAt: "2014-09-23 13:23:26",
	solveTime: 61572,
	transactions: [funding("b758f391a4dc2b0ebc16667b209348389019981d97582e28aa69f41064330c93", "2014-09-22 20:17:14", .025), claim("62bf890257f4c71691c78ed289b1259983939e2582210ce6623819a7102d941a", "2014-09-23 13:23:26", .025)]
});
const rushwalletPuzzle7 = puzzle({
	id: "rushwallet/7",
	chain: "bitcoin",
	address: "16Y9k4AhDJG43dSGMKu6GAVigAfTH2t96x",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("047abacd375a5f4687f1db45d28b17fcd431ac4130d135ffa0be3f416645d2c6d166924c4c3537e52cff0527dc0bd09de0dc73ecaf4bdb4ada9f71167db2582e75"),
	key: hex("6196a23ae9b913a15f1676d7c5d535fe594bc91644ed02b95c8a72742ff9a2ad").wif("5JZGM41oXvaFZ4JUNh4AhDFdDdoziPdHsQPuEJBPCMf3Qo6Cc3w").passphrase("New Quiet Keyboard for Enrique"),
	solvedAt: "2014-09-23 13:23:26",
	solveTime: 61572,
	transactions: [funding("36f74ab06b156937f242f04f8ce4aae3b7ad28b1cecc393259fbee0a5388b4aa", "2014-09-22 20:17:14", .025), claim("6161cf6778dc7a82092cef5a29e4d7bcf52ab86336aa3403bb6a5d3a61ca9a6f", "2014-09-23 13:23:26", .025)]
});
const rushwalletPuzzle8 = puzzle({
	id: "rushwallet/8",
	chain: "bitcoin",
	address: "1BgDHVsu56WwTtCTSsUkiE9Goc4KZcrgvR",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("04e6d5be924603485a80cccb51f8c2bfbb4acdfbf9d65acc58c3b40970c18166a92a609a2c03054ca17a4ad24cc7309e7f9f6a5258eb334815e6e52a3e32284787"),
	key: hex("78ac7258680117f5292c011eb9a823cedd7cf063564b3c1e84361a7ea40890a4").wif("5JjS2XduetuMWs22rCnKbDABvv2UBmTVq8snNwWSikyVfXSSXkn").passphrase("Let's get a new keyboard for this guy, my ears bleed when I sleep."),
	solvedAt: "2014-09-29 20:26:35",
	solveTime: 605361,
	transactions: [funding("187e6d6a8c5f5bdce59e3fe3fa95320550a86844870d7860b53a9bfb7447c1cd", "2014-09-22 20:17:14", .025), claim("977c6fe974874110e1b1b321d852db8525fe588db9aae9c065cf059f74081d34", "2014-09-29 20:26:35", .025)]
});
const rushwalletPuzzle9 = puzzle({
	id: "rushwallet/9",
	chain: "bitcoin",
	address: "1MmiWF1RaDN3yVwQFZpLRfxzFPRF68D1cT",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("04353554bc50692bc7c37229c061fa30d11bba34777f0513fdb39596f2f06f95e6671f93fc7a14dda650957c083198f56be1b1de8b149c122599088efe9fd39683"),
	key: hex("b33618c91eb43dc38ac3d81f008983be0dad8818a761b5e08bfb47d349e09f1f").wif("5KBDJ1QjDuqUm8a6K6hkJ3g1zjb7hpcHGZuDs2wbjtgazFvbqjf").passphrase("supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"),
	solvedAt: "2014-09-22 23:40:53",
	solveTime: 12219,
	transactions: [funding("7ce047c201fe2edbce71dd9cb9e52c34a0860125bbccc0da54dee64fd6815b35", "2014-09-22 20:17:14", .05), claim("9c2e31753906a0410a37c9d75654fbb2b328b3c53ffbfe92787bfaa5e38b78d7", "2014-09-22 23:40:53", .05)]
});
const rushwalletPuzzle10 = puzzle({
	id: "rushwallet/10",
	chain: "bitcoin",
	address: "1EHxfmrG74HSv1dji6uxiKn1ts1pSPr4h7",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("049f5a904e465dd5666b90069c7564994a20f8a1cccac86fa8f65bca875f536e62742afee3904bea3f577735ef75a318c95c18ba752de569b12c85b80a7d1d3162"),
	key: hex("8416ea3c7bd1201df15410bb0e8a6b6cab676502004fa68bced5f42bbb6cf6b1").wif("5JpTdYGejXzzGdKbBR36SpSAAWxMgcyQckpYFoMbSBYnzFFUZcn").passphrase("happy birthday celebrate tony tony"),
	solvedAt: "2014-09-23 13:16:42",
	solveTime: 61168,
	transactions: [funding("de7026fd9171e3a532cedae504536c2cc19ea6568a18775616756079735dbd1c", "2014-09-22 20:17:14", .025), claim("eec469a9d837a90c2becd06afda0f937f744880f82ccb9198211e2fdda8f4f62", "2014-09-23 13:16:42", .025)]
});
const rushwalletPuzzle11 = puzzle({
	id: "rushwallet/11",
	chain: "bitcoin",
	address: "17wDTyKr6pEn6mXUku9vh89JucE1L3SMjb",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("04ee8021595c123587ca98d7682a5f175bfda0326133b572db455756910a0b277a4b19feee6c4d84834d319c3cd72a6c5059f9620dbad21f62b630d774403cde89"),
	key: hex("0f8489b2c250110704e4877b9ac033156ac325908ceee2a8857b14d80207789b").wif("5Hw7xh3T7TVewfSWfmLFJTEki9NSvFbnqVxXg8HMCpLPC3JjNXL").passphrase("www.kryptokit.com"),
	solvedAt: "2014-09-23 16:40:13",
	solveTime: 73379,
	transactions: [funding("991cdeea72a797cffce875f761d82e50e16bfc000cc52f35578a6d9e76d31397", "2014-09-22 20:17:14", .025), claim("6bdff5bd447cd9e33e135e2f4293ef17e55e5884fcb2d9ed20ab5246a6341760", "2014-09-23 16:40:13", 8e-4)]
});
const rushwalletPuzzle12 = puzzle({
	id: "rushwallet/12",
	chain: "bitcoin",
	address: "1EWr7tvs8efFu15nvuL4RezVVoHFpxH2nF",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("040f6968c1f39b2f869891b742a34d2f0153e8c6a538e6a0d50095d03f16257226138b9f0a359ff4899e5249d15a6ac71bc13c19591dc0da2ca032bfc9efbbcb94"),
	key: hex("142e3512dd89fbc3f7fe005d87ff49a58cca7c82a50a2ff1b0f5e64e86b16b48").wif("5HyB4jgZUTrkawvPY872koRsNy2f1VY3RT5DnEpBNsmV6HdPCd9").passphrase("www.rushwallet.com"),
	solvedAt: "2014-09-23 12:44:13",
	solveTime: 59219,
	transactions: [funding("49d7d7d1af718c1eb39d01b574c2dcb41d7aded066167aa0b1765e8d21f1ac60", "2014-09-22 20:17:14", .025), claim("8466270fd586c3d56bf49f64c9165cac88fc96262a994db5152ad012c4238ece", "2014-09-23 12:44:13", .025)]
});
const rushwalletPuzzle13 = puzzle({
	id: "rushwallet/13",
	chain: "bitcoin",
	address: "1GwQ9ik3PH6g4BzwShFdwf2AEhUyfQVBpn",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("044ab4e97848419c137b1c9e652bd4dfafb6f07cfd2e006a4f073c655550386c4c8c39465fc432d30d2ae6b43b4369162903b900de8adeae9f5dc3bf262368fa07"),
	key: hex("f236c7a3bdde16d8264ea2e9d82347721a831a324fc5f42870eed8a720270100").wif("5KexcVAqjA8KcXuU49V2newSVFVQb69BPM1hMft6tGyKQnLTWim").passphrase("rushwallet brainwallets are easy to use"),
	solvedAt: "2014-10-03 21:02:28",
	solveTime: 953114,
	transactions: [funding("86158ded0cd15f16348319e75687015bc82d167f4f4c013ca9703a2adde41905", "2014-09-22 20:17:14", .025), claim("14710d11301c0ce117eca620051e81e919470989b74fbfcaa6172ff5cd9e2b40", "2014-10-03 21:02:28", .025)]
});
const rushwalletPuzzle14 = puzzle({
	id: "rushwallet/14",
	chain: "bitcoin",
	address: "146uBhbW8pvwW3HVcqV6MWhRMiAj9jZj7W",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:16:50",
	status: Status.Solved,
	pubkey: uncompressed("04df7861cd84fd334f2c456e63c154fc6bab65a1d07b67b765c156e859a3795b82f1bf19d94c2007e73ff99ab657d45e0154a1e50110468d4900161c4b165519c0"),
	key: hex("385ec4f7ddaca0501099f902a540e6e09a2d16c7b76616dd44c5d49204e400b0").wif("5JF7UwA2yQKYkjqiuzWHxFSthGKCJCkpdu86FrBh5TNFhAQZn18").passphrase("the kryptokit hardware wallet is coming soon"),
	solvedAt: "2014-09-23 13:58:23",
	solveTime: 63693,
	transactions: [funding("96086d20eb4627b72a91db3b28148499c9431f0478fc75c42ba582b2a6a01112", "2014-09-22 20:16:50", .025), claim("348ee174016be54657af3128f5a56b69da33ce621cdb6c9e18d3b50cb028e3ed", "2014-09-23 13:58:23", .025)]
});
const rushwalletPuzzle15 = puzzle({
	id: "rushwallet/15",
	chain: "bitcoin",
	address: "17TF8fyceXiL81iJz4UhuT5sCiCJCPQSUz",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:35",
	status: Status.Solved,
	pubkey: uncompressed("04b33bbd2d597fe950c5d0b0ea40976f0559ed8095358b314ff7539c4fb4b550960f2e466aa6f851af1bec92f0792e488eb33ac2cf36eb87c9ae54628de9ef45f6"),
	key: hex("89c11d8b682a4ef7fdf4ad7ce2e937f13afefefb0215d4aaf3b2a20b9eca0f77").wif("5JrxLC1LjDWhFYJGQQoC9FAMinChKFFssvDqZfhWSSCGQWdqE7Q").passphrase("MAKERBLOCK MAKERBLOCK MAKERBLOCK MAKERBLOCK MAKERBLOCK"),
	solvedAt: "2014-09-23 15:12:09",
	solveTime: 68074,
	transactions: [funding("7384b84f01718e57793237cc0ab0dee2e19ac99b7ee56d35780a02af3b342210", "2014-09-22 20:17:35", .025), claim("519b60499045c5a1b5f249ca416564ded46cea7b1cb7a8f2751a31964bc0d214", "2014-09-23 15:12:09", .025)]
});
const rushwalletPuzzle16 = puzzle({
	id: "rushwallet/16",
	chain: "bitcoin",
	address: "18WG8J9R7pKiAJ441msJPcawQ9BKp2Rox7",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:35",
	status: Status.Solved,
	pubkey: uncompressed("045c858b5674ffd7d4e0d265a862447725ed9d74e267dd6329afa85160c4527d6a1ba4b73e3ff2ee3430a0ff0d714a1c588c90895e8a4b1ac5a53173197a702e13"),
	key: hex("83eeb2123d29ae80d6e5bebd3525ed057e5afd6a055ba0e2ff23b9448a64088c").wif("5JpPcnF5fHdmhYJqyU4GRTTK2j72EBRDc9J5mHAX1yWro2twj8q").passphrase("Tony's 3d Printer"),
	solvedAt: "2014-09-23 13:58:23",
	solveTime: 63648,
	transactions: [funding("91f591cd63a596d5da52cf458485599390487bdb497cff58282833e3cd85e699", "2014-09-22 20:17:35", .025), claim("a49b00d400cef8c98c80e433b9dd2691de018e549f7f8bab0e605bdce3c2ec70", "2014-09-23 13:58:23", .025)]
});
const rushwalletPuzzle17 = puzzle({
	id: "rushwallet/17",
	chain: "bitcoin",
	address: "16tGKq48tGq3Td1wcDoQRuWtPtXoEfZpBC",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:32:38",
	status: Status.Solved,
	pubkey: uncompressed("0458e33c33b9eec4d9c4da0080c1cf40d4a7a8aac4c3d3ce80f429491a4e3fca9980c3a10106bd0686097880cb8162f6a8835c0fdc91e7af0eb9aef46743513003"),
	key: hex("4dfc9787478140cb8b57f18e51ea7ce0acc032f52d27d4245573d6cfd10212c8").wif("5JQdeTxtRErwuxpQbGfJFWz1ECw3BR4h12zJ5EiPQzw9xusScLw").passphrase("Dmitri Nancy Enrique"),
	solvedAt: "2014-09-25 20:16:57",
	solveTime: 258259,
	transactions: [funding("982f472395906eb47afd40a265e663bca81ef5bbbee12672bcb3cb307a994f27", "2014-09-22 20:32:38", .15), claim("59ae3210bce2a6703572940b1fa651d526c2c30d0b82c6be671e80cd1c84eaff", "2014-09-25 20:16:57", .15)]
});
const rushwalletPuzzle18 = puzzle({
	id: "rushwallet/18",
	chain: "bitcoin",
	address: "1NUpp6S2LjpDBVu76r9LuhCrtrC6cXQNxp",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:32:38",
	status: Status.Solved,
	pubkey: uncompressed("04e864a09c1516ed07696a02e299ad8442be91636f455862098ff55e89355e21e54d4b0d09e6219622bacc1c05f497c7cadefec322448d5623736382e4965db6b0"),
	key: hex("570e7d1dac0f27426f47463b3cd0ec492034450b7a732fe04de49444a21fc336").wif("5JUdKpzUHD8TumDnp2Tirz5JEtxFPkbpeTv3qPWMfRPWMX77zw8").passphrase("BITCOIN ACROSS AMERICA BITCOIN ACROSS AMERICA"),
	solvedAt: "2014-09-23 13:06:18",
	solveTime: 59620,
	transactions: [funding("82ebba32667639f6e8a2877e5a5f8cf75f02113f7667426653af644e499fe7f3", "2014-09-22 20:32:38", .025), claim("4345f9e968fb09eea1257d343502ffa12998aa082cea88cf382730488dcb8b58", "2014-09-23 13:06:18", .025)]
});
const rushwalletPuzzle19 = puzzle({
	id: "rushwallet/19",
	chain: "bitcoin",
	address: "1BwnBeM3xHh8cVmQDUmQjWMENxB1APLDSE",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:32:38",
	status: Status.Solved,
	pubkey: uncompressed("045459e22b853b2419db97609a030bfe06c936b47a973fa8f9dae407f6b05966cb3888b1771ac4b3b5443c49e45060ab79033d48c033a796cbd782c5fa06aa11e5"),
	key: hex("d2cddeb1e8778dbf975f00b32a68e20fe3ab73565d7737c76a0217191afef8cd").wif("5KR8HrKgG9TefHX1YGk8d9AXKA8EWe19SHH6cMUQTeX1dRQJ8r2").passphrase("you thought this was a clue but its not that easy"),
	solvedAt: "2014-09-23 14:03:49",
	solveTime: 63071,
	transactions: [funding("6c1331573603362f808cc88692829128835a703125547c91eb3d648b19ca02e8", "2014-09-22 20:32:38", .025), claim("26a69b8756fc4c58499af364e4fe9b8496f50854a72c87ddd62257a1b8bd3144", "2014-09-23 14:03:49", .025)]
});
const rushwalletPuzzle20 = puzzle({
	id: "rushwallet/20",
	chain: "bitcoin",
	address: "1F49nZxGdLbqKH3TvMnfy9xohZXc8xJBAU",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:32:38",
	status: Status.Solved,
	pubkey: uncompressed("04fdc55c34aa085f649ec5c6fd749aa139cb748f610dfca5b40c7120fd4859371b460caedef96ef2018968dc0c12adacdc58ce2c6cb0addff299c797dbfdaf6a85"),
	key: hex("7758e815ecb5c738e8dccfe55213a5f5b4491c882860352629dde0dd66613f8d").wif("5Jir9XjvcYW5hTug66ToQoWmN8EarSuwGgFVZAEqoMwoyZGYwCU").passphrase("RushWallet Fundraiser by Kryptokit"),
	solvedAt: "2014-09-23 15:57:26",
	solveTime: 69888,
	transactions: [funding("1c57279c898ba2deeb520abc8feb84eb3d0135a175656805271be1c199fa67a3", "2014-09-22 20:32:38", .025), claim("fcd06a4c7bfe4afb8db8fe4bf0bf95371298622cb432e375d0bd9403866a5fcb", "2014-09-23 15:57:26", .025)]
});
const rushwalletPuzzle21 = puzzle({
	id: "rushwallet/21",
	chain: "bitcoin",
	address: "1DXHoGc61UE4x2LLkHfPetrJwcQjyMi9dE",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 21:24:40",
	status: Status.Solved,
	pubkey: uncompressed("0481f959abed78e0c12c2aab725f481d5b3a6d0dbf6ffe215bd3e27261bddce738352d188830d7faacea73213434542c68056d73daa2019cd9c3a4d3075dbb7be7"),
	key: hex("822c57a30037fd4771c354b8f71f93a7b9e3460a2795334eabea2317f84e532e").wif("5JocgUqQg1c6yP9SQ6PSwWoo28BjHiazTVqSdaJCb2fJzW7hyQd").passphrase("Hey try out Kryptokit today"),
	solvedAt: "2014-09-23 13:58:23",
	solveTime: 59623,
	transactions: [funding("a78fd1563a9058bec48f669a1acd24dbf9bd3d50dbfd979b0af4bbd81f7f6177", "2014-09-22 21:24:40", .025), claim("10862911685dcd04ea8280420d6fc900e18e9fff44da3da0c64c4a8feeac2dbd", "2014-09-23 13:58:23", .025)]
});
const rushwalletPuzzle22 = puzzle({
	id: "rushwallet/22",
	chain: "bitcoin",
	address: "19aWJDZ6i4FGLBrx5u57Qee8bSkmsVdFf6",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:40:50",
	status: Status.Solved,
	pubkey: uncompressed("044fcd0443c927ea612bf0f6308d825623df4f145fea77b54d85e78f8fbe19dd9323b3488f2478d6c8d58d4c94de1986c9ec10e2155b7bf286f0a23528d6ee92d7"),
	key: hex("c8f5cf0d0fca8f31ecde1f93f052c4800248b783c36db01b9c5b74ca8fde637f").wif("5KLnqfYcHiQFtX4eH43ZaEcT7J9rYEgPyNMdgXd55U2bDAtRNoq").passphrase("CLiCK CLACK Click CLiCK CLUCK"),
	solvedAt: "2014-09-23 15:12:09",
	solveTime: 66679,
	transactions: [funding("26a69d437296d77c3dbed173c7f504f5085ab24cf0de80a01ff031bdabe33f91", "2014-09-22 20:40:50", .025), claim("47b998851a34f600cd480834c1a1e413e7bb87e3702006428fc6b9b5ce331c61", "2014-09-23 15:12:09", .025)]
});
const rushwalletPuzzle23 = puzzle({
	id: "rushwallet/23",
	chain: "bitcoin",
	address: "1724izW5beNyKGXv4a3zcoTySq8fZoo2RL",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:40:50",
	status: Status.Solved,
	pubkey: uncompressed("04f5980512adb9a9d8dd7fe5b711b4619cdc16aedccc67d959e64bed57c6d89c68174a52e2f1b83874ac58b80aa25c362e634f431b996ae9a37803cd241d7a882f"),
	key: hex("24fe8073b8b2bf67f7f327e6ecd7ef360fb3c651a18013b3b17cd7a568b08818").wif("5J6aYhZSY26EbZ9Xf6PhoMP8UcCBUa6TghUvGWEfxccDtehxky7").passphrase("seans's outpost seans's outpost"),
	solvedAt: "2014-09-29 20:43:00",
	solveTime: 604930,
	transactions: [funding("55ccf3b8b62247922c554ab9d34d2d2092f997002b97fdacbea3f4fc025ad528", "2014-09-22 20:40:50", .05), claim("8ff24eb89410c9f76a8ffa290cc098437859e61633b8d5929d42a1227cf96ef5", "2014-09-29 20:43:00", 9e-4)]
});
const rushwalletPuzzle24 = puzzle({
	id: "rushwallet/24",
	chain: "bitcoin",
	address: "18oFx6mSd3YeywSnXLNpqgG7XdY63JUTnP",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:40:50",
	status: Status.Solved,
	pubkey: uncompressed("04666f17c0d0e0357da1e7c9f8d0f8e42c201dd202d59249b8527a31d73eec5e30feee4f9aaf0456a4e26162287d9e7fe51b1ed99f2b61295ac30d893545453422"),
	key: hex("809893892074b92fbb501182cbf462396e52823002a1c6cc8df6e78ad124f5a5").wif("5JnvPntAhvg5CZbhSsNVfEtnzj1z1UxneRRtg91u4VNMPyEEizi").passphrase("seansoutpost.com seansoutpost.com"),
	solvedAt: "2014-09-23 19:51:42",
	solveTime: 83452,
	transactions: [funding("ee55db336839aebc8d5091a75352fb00f03631812653a030a8a0e0984e96bfb2", "2014-09-22 20:40:50", .025), claim("ca8bcdcf3a7a67dd76fd00959a40108291787151c3bbc482fb7c30b6e649ab1c", "2014-09-23 19:51:42", 9e-4)]
});
const rushwalletPuzzle25 = puzzle({
	id: "rushwallet/25",
	chain: "bitcoin",
	address: "1MZcKzhoptp5ZCqNneRfZeEgstvjHGa8xR",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:48:06",
	status: Status.Solved,
	pubkey: uncompressed("04ab7a4be6048064e7395d0d2b669f9c981d2d72a8ecd15b324f9c06b94c3ae5ce03a4665473b027f617015e46aa5180bf805f5f48bf658a9cefcf0cd08a73363b"),
	key: hex("9fb12e3a0dd90c7256667aa4bb1505b980502da3bad129bf9e10e74fae24221e").wif("5K2chgMds89aLfpAVSeQgGrfMhtzmXMpSb6uCfGr7myx8fXNXop").passphrase("kryptokit.com/fundraiser"),
	solvedAt: "2014-09-23 13:16:42",
	solveTime: 59316,
	transactions: [funding("4d7d7fe525d215c4d5c474ac13dcb739ac2a552443e8ba887215b75b4ac1b94a", "2014-09-22 20:48:06", .025), claim("189cfb8f7328d59ebb2eea4dc49817e9dd5365a1ae9594c10bb5d1732c0abeb8", "2014-09-23 13:16:42", .025)]
});
const rushwalletPuzzle26 = puzzle({
	id: "rushwallet/26",
	chain: "bitcoin",
	address: "17FTRDmSymwBvwiBAx3ds4iVHaCbUCNpKS",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:48:06",
	status: Status.Claimed,
	pubkey: uncompressed("04a0746f2492fddfbd35285b3cb6f15af41fc787596d7e5a42f98e8b11d7648e8879bed40267dda13e5dcbbf2447c99036a0efca56c89c96707aefa07ce392b384"),
	transactions: [funding("21163ad50a28d77165ddf4b528dd32a6902a56ab326e6744df0f71e691836d17", "2014-09-22 20:48:06", .025), claim("d8d2825459f70a17f9807a5c4b7088b248228316101cb097044e7fafb5ac5c99", "2014-09-25 06:53:06", .025)]
});
const rushwalletPuzzle27 = puzzle({
	id: "rushwallet/27",
	chain: "bitcoin",
	address: "1FvnqYfHXEBAbtoghXvubjdpkCxnYVYdWW",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:48:06",
	status: Status.Solved,
	pubkey: uncompressed("0474a738d294281c7489c36a18bc3c54fae1dc793cbea76a79523d415961d015afeb923c190ec40dd32abcd157d895b968acbf2e58317a042ec43697612979ec60"),
	key: hex("41a45f595d71790def095a1add8d4a8a5ffa91ae54bdf867eff0e57d48513e8f").wif("5JKCKXsknfUcC8AudrvaereEhocbWieoTsvzUoNXA8XFn4aD92J").passphrase("babooshka babooshka babooshka babooshka babooshka"),
	solvedAt: "2014-09-23 18:16:50",
	solveTime: 77324,
	transactions: [funding("a9cf4c676178f158ad01fdcab5923ba2b340353057c28c143934bfcdeb6dc1a1", "2014-09-22 20:48:06", .025), claim("774d1e10cefa5767d9fbed138af22ad25048b26b780098557c00f0a3f0e2079b", "2014-09-23 18:16:50", .025)]
});
const rushwalletPuzzle28 = puzzle({
	id: "rushwallet/28",
	chain: "bitcoin",
	address: "14yaVUgstpqavPEFtyit3wEWsyumysqxZV",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("0421bb390cdfda9ea9aebbabd1bd944337a98a54d627fe2c51b7873653f591d5d2b945391f85e7d9219bf4f95bea387795ddb05fe937280700737607c0194ae02e"),
	key: hex("fcf72cce6f8d959c27007355e04e3af112cbe7d7ed4d7ef971327c8b77b22961").wif("5KjhFF7i5bYENHvsvtWjLpjuvrgybEeL4VuyLn6mpUGA2Q8Lv1o").passphrase("Dmitri Enrique Nancy"),
	solvedAt: "2014-09-24 23:14:24",
	solveTime: 183430,
	transactions: [funding("f76ca64ec5751717c4f87f3d1a5cd0f89b1572cdcb42ef3c164ae9b18ef8c452", "2014-09-22 20:17:14", .05), claim("f015d230ce56ca9d740e71527f425aa7d610125046d31ac2f219ce0bc97e3f10", "2014-09-24 23:14:24", .05)]
});
const rushwalletPuzzle29 = puzzle({
	id: "rushwallet/29",
	chain: "bitcoin",
	address: "1N1YaNNTNw54g1djCAwcstrVGpgjDqrnsQ",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:17:14",
	status: Status.Solved,
	pubkey: uncompressed("044c63eba3e8037e65156bc1f7659b6a0019dee7dd9992914b30b9e5949259aa6a2de3bdd46bb63977f45f2873c6de4732419e79be66818078d66ff55d187bc90b"),
	key: hex("e1b404bb5fdd9941b0743b3fa49fe28d076211ac7dd4462a3274df8d67dd5f5e").wif("5KXgsE2AkJjtuJiEqTvxc5zJMZjbAZD6qBGU3ZhnExBcUPioUR8").passphrase("THE MYSTERY MAN BEHIND THE CRYPTO-CURRENCY"),
	solvedAt: "2014-09-23 17:17:35",
	solveTime: 75621,
	transactions: [funding("574876a325f5ffda9569a4df9e3574b1019e4f773204f61e37bf83b90c17093d", "2014-09-22 20:17:14", .1), claim("c4fa1a199e2f2a08a425c2dc11bfeb39c6ceaa6ce10746fdf7cf6d8b430cf283", "2014-09-23 17:17:35", .1)]
});
const rushwalletPuzzle30 = puzzle({
	id: "rushwallet/30",
	chain: "bitcoin",
	address: "13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj",
	sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
	startedAt: "2014-09-22 20:48:06",
	pubkey: uncompressed("04b28d687ff46211d3cf75021db818b86f70addcb42ccedf53f4280926bd2a7fba0784eb6b8d23313c3c85ea1df284cf2844371ca499fcb48ba8a26df651c29a85"),
	transactions: [
		funding("87fec08c933c04fe5b60c14cc8e5a7dabe10774380e06458c88f1d194e06828c", "2014-09-22 20:48:06", 1),
		decrease("73950f9a1f0e1fa512194b753a6e2d836154ff407293bedea4fcd4b22f109653", "2015-03-25 21:33:55", .9999),
		increase("64278e7126e83831f91e84fa27f2bc6e88442d2dfa0361dd52a7c9abf0852cbf", "2015-04-24 18:28:44", .01)
	]
});
var RushwalletCollection = class RushwalletCollection extends NamedCollection {
	static key = "rushwallet";
	static author = party("Dmitri Kryptokov", {
		key: "dmitri-kryptokov",
		aliases: ["thisisarushwalletbrainwalletnooot", "DMTRI"],
		about: "The office worker from the RushWallet contest video, reused as the author persona of the puzzle by KryptoKit, the Toronto company behind the wallet.",
		addresses: ["1GShq18eb4V6uBtqgwxkmuPTUHCtyBcNYA"],
		profiles: [profile("soundcloud", "https://soundcloud.com/thisisarushwalletbrainwalletnooot"), profile("codepen", "https://codepen.io/dmitrikryptokov")],
		facts: [
			fact("KryptoKit's press release names Dmitri as the character in the contest video, an office worker raising money for a quieter keyboard, and KryptoKit as a Toronto company founded in 2013 by Steven Dakh and Anthony Di Iorio.", "https://bitcoinmagazine.com/press-releases/kryptokit-releases-video-based-contest-showcase-power-bitcoin-brainwallets-1411503632", { date: "2014-09-23" }),
			fact("Two of the thirty contest passphrases carry the name: Dmitri Nancy Enrique on wallet 17 and Dmitri Enrique Nancy on wallet 28.", "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest"),
			fact("The SoundCloud account was created and used once, on 2014-10-23, for a remix of YT Cracker's Bitcoin Baron with a Morse code message in the bridge.", "https://soundcloud.com/thisisarushwalletbrainwalletnooot", { date: "2014-10-23" }),
			fact("The CodePen account has exactly one pen, Hidden Wallet, published the same day 27 minutes before the track.", "https://codepen.io/dmitrikryptokov/pen/qBGLJZ", { date: "2014-10-23" })
		]
	});
	static puzzles = [
		rushwalletPuzzle1,
		rushwalletPuzzle2,
		rushwalletPuzzle3,
		rushwalletPuzzle4,
		rushwalletPuzzle5,
		rushwalletPuzzle6,
		rushwalletPuzzle7,
		rushwalletPuzzle8,
		rushwalletPuzzle9,
		rushwalletPuzzle10,
		rushwalletPuzzle11,
		rushwalletPuzzle12,
		rushwalletPuzzle13,
		rushwalletPuzzle14,
		rushwalletPuzzle15,
		rushwalletPuzzle16,
		rushwalletPuzzle17,
		rushwalletPuzzle18,
		rushwalletPuzzle19,
		rushwalletPuzzle20,
		rushwalletPuzzle21,
		rushwalletPuzzle22,
		rushwalletPuzzle23,
		rushwalletPuzzle24,
		rushwalletPuzzle25,
		rushwalletPuzzle26,
		rushwalletPuzzle27,
		rushwalletPuzzle28,
		rushwalletPuzzle29,
		rushwalletPuzzle30
	];
	static hints = [official("Search for clues in the RushWallet Fundraiser video to unlock each wallet and claim the bitcoins.", "https://rushwallet.com/contest", confirmation("https://web.archive.org/web/20150208172337/https://rushwallet.com/contest", "The contest page gives this instruction and embeds the Fundraiser video (https://www.youtube.com/watch?v=sr8lBrtd9U4)."))];
	static techniques = [technique("sha256-brainwallet", "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest")];
	constructor() {
		super(RushwalletCollection.key, RushwalletCollection.author, RushwalletCollection.puzzles, RushwalletCollection.hints, RushwalletCollection.techniques);
	}
};
const rushwallet = new RushwalletCollection();
export { RushwalletCollection, rushwallet };
