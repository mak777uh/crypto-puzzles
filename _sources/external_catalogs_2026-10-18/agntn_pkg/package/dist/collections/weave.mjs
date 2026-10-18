import { PartyKind, claim, fact, funding, increase, party, profile, uncompressed } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NumericCollection } from "../_chunks/collection.mjs";
const weave1 = puzzle({
	id: "weave/1",
	chain: "arweave",
	address: "PbdTDYikdddWfNFlDt2aZokALXKe1mJVSC9TALUBNv8",
	sourceUrl: "https://arweave.net/byT7l6tkFq8mzqshwmju8fVi1rp8H9mYanlxzsJ7RjQ#instructions",
	startedAt: "2019-05-22 10:27:23",
	status: Status.Claimed,
	prize: 1e3,
	solvedAt: "2019-05-23 19:53:50",
	solveTime: 120387,
	transactions: [
		funding("Yd0DrtrEzTg3K9HCxQY5fKgnng4S9ShH2WYmObFTLmo", "2019-05-22 10:27:23", 500),
		funding("KZac9xX660vJQmymsawId_pdM-oJjBYIlCSVE__Vq7w", "2019-05-23 15:13:40", 500),
		claim("BYZEa-jS5pfY-dakErCemga4fkM-mjBDEONW0IzcYAs", "2019-05-23 19:53:50", 999.99978588)
	],
	solver: party("pogo", {
		key: "pogo",
		about: "Handle credited with the first two Arweave puzzles, each solved within two days of going up.",
		facts: [fact("ZorenX's write-up of Puzzle 01 names pogo as the solver: a row of mini riddles typed into the page in the exact format it wanted.", "https://zorenx.medium.com/arweave-puzzle-series-puzzle-01-solved-59aa19a0ea2f")]
	})
});
const weave2 = puzzle({
	id: "weave/2",
	chain: "arweave",
	address: "4WDNiit5lNCZWgxGOK3tTJxS5dOwJjRmTqDnxOjMuWk",
	sourceUrl: "https://yvmqerqbjzui3g2lnze7qwkaocl3ikhavhuvl2vvcek4u7f3e2la.arweave.net/xVkCRgFOaI2bS25J-FlAcJe0KOCp6VXqtREVyny7JpY",
	startedAt: "2019-05-24 06:23:05",
	status: Status.Claimed,
	prize: 1250,
	solvedAt: "2019-05-24 17:51:23",
	solveTime: 41298,
	transactions: [
		funding("TUNZkBsDP7N0stBp8VCUU86sYhLgYSa6aiPCTJ2kDYU", "2019-05-24 06:23:05", 250),
		funding("0lvvvE0Isy3TqmJwOhIWVidJNECLwdCI5L9vp1JLync", "2019-05-24 10:04:08", 1e3),
		claim("NgecvZjHWx9GTi3SdIQnw8SwPQBmJ8BIOVrIvKCQnRY", "2019-05-24 17:51:23", 1249.74967882)
	],
	solver: party("pogo", {
		key: "pogo",
		facts: [fact("ZorenX's write-up of Puzzle 02 names pogo as the solver: numbered paper pieces answered with a square count, a chess position and a cryptarithm.", "https://zorenx.medium.com/arweave-puzzle-series-puzzle-02-solved-71fd4c71bbc")]
	})
});
const weave3 = puzzle({
	id: "weave/3",
	chain: "arweave",
	address: "wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0",
	sourceUrl: "https://ur42unm2jhdm.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw",
	startedAt: "2019-05-25 13:07:33",
	prize: 1000.165838006237,
	transactions: [
		funding("hTB5Ouv5nY11pQiGFXCJQZxNOkVlgPAAJ9IYSRu8v0E", "2019-05-25 13:07:33", 250),
		funding("_Aa5au3qzhCSIPxj5RfLkF_eSUuxAcnqoWY3PeKTaRg", "2019-05-27 08:30:39", 500),
		funding("7-sWojFc0sG3mTr34YGBGssYDvXjOPZf-xik8v1Ct24", "2019-08-28 14:09:38", 250),
		increase("2u0lD8wh91CYdWU0NiqSPC2K2MBo-1KdtKSREcSoyjc", "2021-12-21 01:58:12", .03062018),
		increase("N3QK1FqFNCZiBcVxvxX1-cGt9Fe2diHRweNHkHGmMT4", "2021-12-21 02:08:30", .06062018),
		increase("v5O2c17vpwEEfU95az3mOY7q6CYQVwccP6ete-r-ftA", "2022-01-07 04:59:21", .021819694228),
		increase("FCsWS_dtojohiNk4kcbEpJY54D2V9SKSU_LPY2AjQSA", "2022-01-11 00:31:23", .01012021),
		increase("wR8Pb5keY5BHc7Ec1V_lL12Bz44MnSJWZ0HaZr9Ceh4", "2022-01-11 10:13:36", .01012022),
		increase("IGN3Z_wVZuWJb8QcfhfNDWu_kCQUYnaqffuNmE37l4A", "2022-01-12 05:32:00", 1e-4),
		increase("u5iuFdT2lfxxTBktPAK8j0yMdsMlfwLuR1XLSdLE7hI", "2022-01-12 14:08:38", .02071986),
		increase("SzNjPkNIbSLlfhiEW-qNoK7tSTc0HWz2aPrZPTiU5JI", "2022-01-12 16:49:18", 1e-6),
		increase("-E_0Q3agm5Rc8fzxIvC0WW-8oOzN_EbzbGyRXgrEg3c", "2022-01-13 23:39:22", .01012011),
		increase("HiEiUAjMN2NxCbjEhAnabMhbdGhcnUvkSXlRihxeoKc", "2022-01-18 01:06:01", 2015e-8),
		increase("7eCtgsiOD_J55Uw1bAtBJFqG-gR1Tg2TVber2XHAdBY", "2023-01-22 13:50:10", 22092009e-12),
		increase("qvXoXXJon5aJFS0qRxOvxk9W7WZ0FIQ-e2fy0H2s_cs", "2024-09-28 13:56:17", 1e-4),
		increase("K8IFZ07jR_HizFcDcftaCbvudwAoV2BwK0akhze06bU", "2024-10-21 21:40:28", 1e-6),
		increase("7tlLswfC_m4-uWdBZZUqf3jN0miBvxrBgI-Wcmw0NNs", "2024-10-29 00:16:41", 1e-6),
		increase("dfEvjWidC-wmwGNH2VsNW306ig5gVxIjcaCN1_BdU9I", "2025-03-01 22:20:52", 21863e-8),
		increase("60hxcT_CtksOSuomGPTBgJzQ4c7QLQB0VISaoviCV0A", "2025-03-01 22:20:52", .001),
		increase("xYOOjZ0mwOvpX2S6fqor-sUaIZzzs7ZcSaaBhCxFBHM", "2025-04-02 21:03:42", 1e-6),
		increase("YenAYAtdtHC5v3asuyHO-DKqsgH3AtmB8NSUg8gfADo", "2025-04-24 14:55:35", 1e-6),
		increase("mQWtaEladqzF252FDZYIdlh4WN0pSUNcYw9c7WC3WqE", "2025-05-03 09:48:37", 1e-6),
		increase("sIk1_tBf0IMyhQ_7M8yT6Hi5qpAk-DoRA3GCdGJj8j0", "2025-05-22 19:19:42", 1e-6),
		increase("J6n8_SoC_D4xTM0SomeBgio4DhnfKkX7o4vF5GPCbzU", "2025-06-19 23:02:04", 1e-5),
		increase("zJUm4DaKPDiZJpl3VYOCZoJnqA2mo3ZLwhc6Ofh-Q2U", "2025-07-07 19:27:19", 1e-5),
		increase("GR--qQMYb1ZWqivHqduNLSJCgGwgVWFurlK5OGXHIfo", "2025-08-03 22:14:27", 12e-5),
		increase("3C8irHSs55x5MLNcEpagTbco6pNSLZhBBZNttSJzeuE", "2025-08-14 15:04:00", 2e-5),
		increase("4lAEn1ILSp83ZNOtJVbTgkodcOTlDjpD0jzHhSJScNM", "2025-08-27 15:46:14", 2e-5),
		increase("2CmH16CxMGzfqLOyNrRuWNhyTwBXemmZE_l0b6hfwEQ", "2025-09-26 17:18:50", 4968e-8)
	]
});
const weave4 = puzzle({
	id: "weave/4",
	chain: "arweave",
	address: "2pwE_LEzD0z6m_ENCDIta9YTBKXW9FFCURrx1yJoO7w",
	sourceUrl: "https://ojducxyzj2dirbt7xt2jod7dkwfqolxjre6tzp63fycuq5477vta.arweave.net/ckdBXxlOhoiGf7z0lw_jVYsHLumJPTy_2y4FSHef_WY#instructions",
	startedAt: "2019-05-25 15:39:57",
	status: Status.Claimed,
	prize: 500,
	solvedAt: "2019-11-10 10:25:40",
	solveTime: 14582743,
	transactions: [
		funding("e06EdrRKRFA-ymkfaAa1hNcBBO0yWKrf-ON9p6JmWd0", "2019-05-25 15:39:57", 250),
		funding("2UuC2087I_yNZ3Fc5bMUfjwPOAg2CEhLmQNuEDiRMjE", "2019-08-28 14:01:39", 250),
		claim("oAg07abF6rlrbZfn7P4AT05XN0VIAB_0V8j4L-0-Vt4", "2019-11-10 10:25:40", 499.99997828)
	],
	solver: party("arpox", {
		key: "arpox",
		kind: PartyKind.Person,
		aliases: ["Arpoxy"],
		about: "Twitter user who solved Arweave Puzzle 4 after five and a half months and replied to the author with the answer.",
		profiles: [profile("twitter", "https://twitter.com/Arpoxy")],
		facts: [fact("Replied to @ArweaveP with the answer string and a short I solved puzzle 4, thanking the author for the puzzles.", "https://x.com/Arpoxy/status/1193546824289832960", { date: "2019-11-10" }), fact("ZorenX's write-up of Puzzle 04 names arpox as the solver.", "https://zorenx.medium.com/arweave-puzzle-series-puzzle-04-solved-69ca109f3614")]
	})
});
const weave5 = puzzle({
	id: "weave/5",
	chain: "arweave",
	address: "G2BaxD9phYHJ55VaEY-aX28FtQCKLORMMQSc74IaqYg",
	sourceUrl: "https://arweave.net/H3NuKVKHTAkb5MqTUbyY77UqiqgExrnTBgc2uKiXq00#instructions",
	startedAt: "2019-05-25 15:45:15",
	status: Status.Claimed,
	prize: 500,
	solvedAt: "2023-09-03 16:38:10",
	solveTime: 134959975,
	transactions: [
		funding("H7PEY8brbrdhiz3EMDjEcVIiTI1EUcQYyO2B8TACPMI", "2019-05-25 15:45:15", 250),
		funding("lRzGOduxfmyb7X1gz9Q_sMJpjy0LgM7vP2izY72TIN8", "2019-06-03 06:45:40", 250),
		claim("ymccg1q8qOyRlF-P9lASjgjl6_2FLiaTbdJ2Tn9HmZQ", "2023-09-03 16:38:10", 499.98423607)
	]
});
const weave7 = puzzle({
	id: "weave/7",
	chain: "ethereum",
	address: "0x13f968d3bb996f39838ade86109b8150ba890d7e",
	sourceUrl: "https://arweave.net/I9b6im2OKIZh44eMEquRvsISkfl189esaoDSLOO0G9Y",
	startedAt: "2019-06-10 16:40:22",
	status: Status.Claimed,
	pubkey: uncompressed("04efcc633c8b274015b22b6aaa9c936bebbf39f7d94e23525973491d534c27d97956194b2c0313bf9bf8f8f390117e50f9aeb2df45c1cf06c337b97cc3e07a364e"),
	prize: 3,
	solvedAt: "2023-09-18 09:00:11",
	solveTime: 134842789,
	transactions: [
		funding("0xbf6dbe70baaa90dd90810ca9fc6e0012bf05419ae92aa7e1d17ecf892515071c", "2019-06-10 16:40:22", 1),
		funding("0x7f892d644529d231dccfbaf5127634996fbbaf7cc7f4b4866d1c4a9e39bd2c6f", "2019-06-12 10:15:06", 1),
		funding("0x7a06401c304248848bacdd596391745176888925ed09774aa28058de1148c723", "2019-06-12 15:49:55", 1),
		claim("0xb62ae885191bd5ef9d822e2ab0c49ce6127e0efcea09fd42f1a4f552b14dc068", "2023-09-18 09:00:11", 2.994808896749136)
	]
});
const weave8 = puzzle({
	id: "weave/8",
	chain: "arweave",
	address: "ayJQH1S6Fi52OEokLVi2tl5kr_y39LSfhJcNV0z9Ny4",
	sourceUrl: "https://mwgauw2twixdxh3fm6mywx7tvuxo442xtckttdbhpbctxz3em5fq.arweave.net/ZYwKW1OyLjufZWeZi1_zrS7uc1eYlTmMJ3hFO-dkZ0s",
	startedAt: "2020-01-08 11:19:09",
	status: Status.Claimed,
	prize: 400,
	solvedAt: "2020-03-07 05:57:26",
	solveTime: 5078297,
	transactions: [funding("QC2WG7BkxHLnlREz6DsdoFm4wlmmSnwXYAPn9NWEvF4", "2020-01-08 11:19:09", 400), claim("IyDIQkSbPFAe7Iunxr6A7Hwzt0QTbX6_NV8Vrn7L_5M", "2020-03-07 05:57:26", 399.99999394)],
	solver: party("lia", {
		key: "lia",
		about: "Handle credited with Arweave Puzzle 8, three riddles about famous deaths.",
		facts: [fact("ZorenX's write-up of Puzzle 08 names lia as the solver of the three death riddles: Rasputin, Wilhelm, Alekhine.", "https://medium.com/@zorenskye/arweave-puzzle-series-puzzle-08-solved-34a2b32fb308")]
	})
});
const weave9 = puzzle({
	id: "weave/9",
	chain: "ethereum",
	address: "0x6f85d220c70abb69a1205b96b566c1ed5d9c3831",
	sourceUrl: "https://arweave.net/1--NRFY3naNwTlxBSRjzDPNUq-Cn1yLG2RmgGHZem9c",
	startedAt: "2020-01-08 11:15:41",
	status: Status.Claimed,
	pubkey: uncompressed("04f1100d322a28855e242c57d4481192396ac2b50926568e4e12f3a6f2a44e34c9be14b2ebb7352f739ac3aad9563634de2ee2b07352682039deceaeb12ae2fafc"),
	prize: 100,
	currency: "DAI",
	solvedAt: "2020-06-08 06:36:33",
	solveTime: 13116052,
	transactions: [funding("0x3f2a623857ca0378d14075256d7def3ec5cfffa435a05c3bbd7cbc14e5587ae8", "2020-01-08 11:15:41", 100), claim("0x91968c60519866e1a982177ffca22d60520904e53ae6d11814fbc501ad0289bd", "2020-06-08 06:36:33", 100)]
});
const weave10 = puzzle({
	id: "weave/10",
	chain: "arweave",
	address: "bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs",
	sourceUrl: "https://arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg",
	startedAt: "2020-04-14 09:17:16",
	prize: 500.02225493,
	transactions: [
		funding("uurk6fxEsygKJmr-fJyC-3sPneslNV3ZtUx0fZxZAG0", "2020-04-14 09:17:16", 500),
		increase("iI9rjoVNoZoWAHudVCN9wWlJL5YFMeo2r0SoUC0LbG4", "2022-01-07 05:06:10", .021863),
		increase("ChM61oJsB8p3W63jxJjSQX3rjJRA3FzZ2F5kQ0a1GWQ", "2024-09-28 13:07:00", 1e-4),
		increase("KKw55MWbTtbw54mCxg77guHwUs5dNTJP9ThNr0CYzt4", "2024-10-21 21:11:42", 1e-6),
		increase("Nv63dxWDroFbli8qsi5Ta8PL8KB7hvnc3e9ZEemowbw", "2024-10-29 00:20:23", 1e-6),
		increase("mIPaMftJhXle_iE9ezin45538KBc5JP2blBu3xS3P4E", "2025-04-02 20:53:36", 1e-6),
		increase("UO-F1lFXv_F4dtz7PfpVcSiYCZM_vY9I8KHSvQgql6Y", "2025-04-24 15:14:03", 1e-6),
		increase("RrWVvQf90nLLMD356_mV372BqC96_Zn-yby9-7ci6r8", "2025-05-03 09:12:11", 1e-6),
		increase("pGqJYirSEQ2KIGz3pownU1LLWe-6_YSHLYNzMdXKfgs", "2025-05-22 18:36:20", 1e-6),
		increase("W_V6dhrB9nxKQUYOWTrJp2Iazi14FnhwxoC_xjIHy9k", "2025-06-19 22:37:50", 1e-5),
		increase("BS7ShTDtll_cOTLVcuoI9ShtR-slDxEh2kl3R_yTRwg", "2025-07-07 19:04:54", 1e-5),
		increase("Uf20u0MPh-mepqkHYYH31mTd4ibyyZ-Sl6deeyYtcJ4", "2025-08-03 22:21:15", 12e-5),
		increase("4M5Whco4CcU7FkIlhII_j81V_5IYxxSu7ljEWBaLiIs", "2025-08-14 14:53:41", 2e-5),
		increase("FKZ_TtmvFzBxfgxAnx76lp36cinHXDa2jF3uoZa5Cb4", "2025-08-27 14:49:19", 2e-5),
		increase("fqDnw6TGuBEmWvYDNyl9WHdEgauKvKGFfrVW4KkkQa4", "2025-09-26 16:28:06", 10593e-8)
	]
});
const weave11 = puzzle({
	id: "weave/11",
	chain: "ethereum",
	address: "0xff2142e98e09b5344994f9beb9c56c95506b9f17",
	sourceUrl: "https://arweave.net/CzITHnEIlkQw9SbaX5futCzFrKk1qe_NwvWnIBmP2fY",
	startedAt: "2020-04-14 09:10:29",
	prize: 1,
	transactions: [funding("0x0d4738abf9d5c03c196eee4953feeb56ff06c385fa322bc9c76e105da38d7563", "2020-04-14 09:10:29", 1)]
});
const weave12 = puzzle({
	id: "weave/12",
	chain: "arweave",
	address: "XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg",
	sourceUrl: "https://arweave.net/gymumAAsxGlzqPL5HzoEB8Xryu61o174j7vHwx21Qoo",
	startedAt: "2020-04-14 09:17:16",
	status: Status.Claimed,
	prize: 400.00248121,
	solvedAt: "2026-10-03 23:38:40",
	solveTime: 204214884,
	transactions: [
		funding("BregUvA5IRkePHvH6G5fL54ZI-L4JF2TfO7NyRj6U-Y", "2020-04-14 09:17:16", 400),
		increase("gNIyLL2XvJJzofsHChbUVBzpmUYUgujT6mNqTyTLi_o", "2022-01-07 05:03:30", .0021863),
		increase("1JVZN9rUBNAv3llx0N39cl3oosizZvyf9eqC7mCQlnI", "2024-09-28 14:01:46", 1e-4),
		increase("N-G9FeB0u7ANfnFv0YIUTknFA2Q4XX_93ndWFrQAbI8", "2024-10-21 20:46:05", 1e-6),
		increase("odUz9pZ5zbgsIqIjqHjaWRPRObbyyhlTf6EafH1aceA", "2024-10-28 23:43:34", 1e-6),
		increase("ukz4-d-URfO2rX2RivKq2Y3PsHb1YwnCNQk5A6PCfdI", "2025-04-02 20:40:26", 1e-6),
		increase("TLlOIum1zHWhOVRN6VLtOQlVN_i7NcStwOpkTiIaI5M", "2025-04-24 15:14:03", 1e-6),
		increase("P-CUyNys4ed5059lM03Q8VjZOQs9BQU0V46XqT_ntqg", "2025-05-03 09:51:58", 1e-6),
		increase("WucVspfMqCWvX1Syf4eBPhHvuNqR-6udOhL4XeJD7DE", "2025-05-22 17:16:13", 1e-6),
		increase("gNUe50v2CY-lW89pj9aSybqgUfBrMWWhBd52uvUpcWs", "2025-06-19 22:58:48", 1e-5),
		increase("CBgDdGjNerHdMzs2Lcq1JNZ3-ZMf_8draoxVGmPXYdM", "2025-07-07 18:06:53", 1e-5),
		increase("NTEYpXKzitcqWs6tgUG8L8hYnKiYVGPJfxUmG2p5hwQ", "2025-08-03 21:21:52", 12e-5),
		increase("AMMAbYCwdQTggJzvzTLNqZq2cEmZk2X7QBBEv7-Pl2w", "2025-08-14 13:52:38", 2e-5),
		increase("SjwOyjmk6hC0GasXt1Wa2fSNegim1FMRaDvFGtB8vds", "2025-08-27 16:23:06", 2e-5),
		increase("X-ub8iQZQneQHXxTaBrviAtDMD1sJNqF4XOKmodyU1E", "2025-09-26 18:02:37", 891e-8),
		claim("o2Zq39Y9YstAJRFJS18o2nXErM7NQ86HGDVRXlCior8", "2026-10-03 23:38:40", 1),
		claim("gx0Ws1TPZhmgTRk6j6UjMuaHiX4vYvfoqjzzW6Os7wo", "2026-10-03 23:43:39", 398.751263406938)
	]
});
const weave13 = puzzle({
	id: "weave/13",
	chain: "ethereum",
	address: "0x0a5c81f5bfb8ec2f47deff466a1a4e55b8fc9319",
	sourceUrl: "https://arweave.net/icRlgZbXVq01wPrFdllafMvKXoQ6Kfo1mQMdmeyX514",
	startedAt: "2020-05-18 23:53:09",
	status: Status.Claimed,
	pubkey: uncompressed("048478c17fdc44729e96f3538ef45243210de070feb757f891c18c665396ee29562865e0f0cd72b85438e460c815a80afa650e568074616b85c5c1603e43cb4ea7"),
	prize: 1,
	solvedAt: "2020-05-23 01:26:15",
	solveTime: 351186,
	transactions: [funding("0x7638cc1662742f6e3fa07e48d010744ae7c08c0a144d8efe8e8d961cee5a89ac", "2020-05-18 23:53:09", 1), claim("0x489ee0b07653ca91c52b3201b795f55824529c1acbfadeb088b9493db78e136e", "2020-05-23 01:26:15", 1)],
	solver: party("lefevre", {
		key: "lefevre",
		about: "Handle credited with Arweave Puzzle 13, an image puzzle worth 1 ETH, four days after it went up.",
		facts: [fact("ZorenX's write-up of Puzzle 13 names lefevre as the solver: eight pictures identified, their labels hashed with SHA-256 into the key.", "https://medium.com/@zorenskye/arweave-puzzle-series-puzzle-13-solved-d770655f705b")]
	})
});
var WeaveCollection = class WeaveCollection extends NumericCollection {
	static key = "weave";
	static author = party("Tiamat", {
		key: "tiamat",
		kind: PartyKind.Person,
		aliases: ["ArweaveP"],
		about: "Pseudonymous programmer behind the Arweave Puzzle Weave series and the Chronobot.io node monitor. Self-described as based in France. No other name known.",
		profiles: [profile("website", "https://chronobot.io/"), profile("twitter", "https://twitter.com/ArweaveP")],
		facts: [
			fact("Told Arweave's Community Spotlight interview: country France, occupation programmer, watching the Arweave project since early 2018.", "https://arweave.medium.com/community-spotlight-meeting-tiamat-e484655b25e0", { date: "2019-10-10" }),
			fact("Built chronobot.io alone, because nothing public showed how Arweave nodes were doing at the time.", "https://arweave.medium.com/community-spotlight-meeting-tiamat-e484655b25e0", { date: "2019-10-10" }),
			fact("Names tangible puzzles like Hanayama's and a Bitcoin puzzle on Reddit as the inspiration for the weaves, and hosts them on the permaweb for its immutability.", "https://arweave.medium.com/community-spotlight-meeting-tiamat-e484655b25e0", { date: "2019-10-10" }),
			fact("Answered whether more puzzles would come with: Maybe, if I get ideas.", "https://arweave.medium.com/community-spotlight-meeting-tiamat-e484655b25e0", { date: "2019-10-10" })
		]
	});
	static puzzles = [
		weave1,
		weave2,
		weave3,
		weave4,
		weave5,
		weave7,
		weave8,
		weave9,
		weave10,
		weave11,
		weave12,
		weave13
	];
	constructor() {
		super(WeaveCollection.key, WeaveCollection.author, WeaveCollection.puzzles);
	}
};
const weave = new WeaveCollection();
export { WeaveCollection, weave };
