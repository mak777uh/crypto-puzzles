
            const address = 'bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227';
            let refresher;
            const constants = {
                0: { m0801:-0.0000000001778814, m0802:0.000001028486, m0803:-0.001840386, m0804:0.9767985, m0805:161.6667, m1901:-0.000000000004912507, m1902:0.00000002640374, m1903:-0.00004444483, m1904:0.02239132, m1905:31, m1201:-0.000000000009270055, m1202:0.00000002810178, m1203:-0.00001455565, m1204:-0.007550225, m1205:73},
                1: { m0801:-0.0000000003604234, m0802:0.000001243898, m0803:-0.0010529, m0804:0.06219325, m0805:187.3333, m1901:0.00000000002749316, m1902:-0.0000001147984, m1903:0.0001433886, m1904:-0.04941946, m1905:26.33333, m1201:5.633069E-13, m1202:0.000000009286787, m1203:-0.00003392627, m1204:0.02509866, m1205:75},
                2: { m0801:0.0000000004630375, m0802:-0.000002004174, m0803:0.002666545, m0804:-1.048782, m0805:228, m1901:-0.00000000001615627, m1902:0.00000007342966, m1903:-0.000104316, m1904:0.04484277, m1905:28, m1201:-0.00000000001584376, m1202:0.00000005974862, m1203:-0.00006280295, m1204:0.01508107, m1205:74.33333},
                3: { m0801:0.00000000005051516, m0802:-0.00000002772319, m0803:-0.0003274386, m0804:0.3425072, m0805:189, m1901:-0.000000000006839611, m1902:0.0000000303101, m1903:-0.00004152659, m1904:0.01687056, m1905:21.33333, m1201:-0.00000000002051883, m1202:0.0000000909303, m1203:-0.0001245798, m1204:0.05061169, m1205:78},
                4: { m0801:0.00000000001080186, m0802:-0.0000001619788, m0803:0.0004319936, m0804:-0.2931066, m0805:218, m1901:-0.00000000003008087, m1902:0.0000001266961, m1903:-0.0001614587, m1904:0.05885814, m1905:26, m1201:0.0000000000259744, m1202:-0.0000001177311, m1203:0.0001661667, m1204:-0.07027447, m1205:71.66667},
                5: { m0801:-0.000000001024603, m0802:0.000004281052, m0803:-0.005372738, m0804:1.747534, m0805:340, m1901:0.00000000005048969, m1902:-0.0000002187338, m1903:0.0002929919, m1904:-0.1181678, m1905:29.33333, m1201:-0.00000000001982306, m1202:0.00000009490061, m1203:-0.0001450261, m1204:0.06960717, m1205:71.66667},
                6: { m0801:0, m0802:0.00000009912324, m0803:-0.0002308133, m0804:0.0907822, m0805:216, m1901:0, m1902:-0.000000003892184, m1903:0.00000888414, m1904:-0.003271118, m1905:26.33333, m1201:0, m1202:0.000000009935641, m1203:-0.00002528363, m1204:0.01262213, m1205:69},
                7: { m0801:0, m0802:0.0000002688816, m0803:-0.0006109689, m0804:0.2195974, m0805:169.3333, m1901:0, m1902:-0.00000001373801, m1903:0.00004543914, m1904:-0.03395173, m1905:29.33333, m1201:0, m1202:0.000000009465833, m1203:-0.00002514228, m1204:0.01353801, m1205:73.33333},
                8: { m0801:0.00000000005051516, m0802:-0.00000002772319, m0803:-0.0003274386, m0804:0.3425072, m0805:189, m1901:-0.000000000006839611, m1902:0.0000000303101, m1903:-0.00004152659, m1904:0.01687056, m1905:21.33333, m1201:-0.00000000002051883, m1202:0.0000000909303, m1203:-0.0001245798, m1204:0.05061169, m1205:78},
                9: { m0801:-0.000000001024603, m0802:0.000004281052, m0803:-0.005372738, m0804:1.747534, m0805:340, m1901:0.00000000005048969, m1902:-0.0000002187338, m1903:0.0002929919, m1904:-0.1181678, m1905:29.33333, m1201:-0.00000000001982306, m1202:0.00000009490061, m1203:-0.0001450261, m1204:0.06960717, m1205:71.66667}
            };
            
            function onYouTubeIframeAPIReady() {
                var player = new YT.Player('player', {
                    videoId: 'paehCmD14dI',
                    events: {
                        'onReady': onPlayerReady
                    }
                });
                
                var rec = document.getElementById('rec');
                
                function updateInterface() {
                    if (!refresher) {
                        refresher = setInterval(updateInterface, 1000);
                    }
                    const vTime = player.getCurrentTime();
                    const pbs = player.getPlaybackRate();
                    const minutes = Math.floor(vTime / 60);
                    const seconds = Math.floor(vTime % 60);
                    const timestamp = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    const { h, s, l } = calculate(pbs*4-1, vTime);
                    rec.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
                }
                
                function onPlayerReady(event) {
                    event.target.playVideo();
                    updateInterface();
                }
                
                function calculate(index, t) {
                    const math = constants[index];
                    if (!math) {
                        return { h: 0, s: 0, l: 0 };
                    }
                    const { m0801, m0802, m0803, m0804, m0805, m1901, m1902, m1903, m1904, m1905, m1201, m1202, m1203, m1204, m1205 } = math;
                    const x = t;
                    const h = Math.round(Math.pow(x, 4) * m0801 + Math.pow(x, 3) * m0802 + Math.pow(x, 2) * m0803 + x * m0804 + m0805);
                    const s = Math.round(Math.pow(x, 4) * m1901 + Math.pow(x, 3) * m1902 + Math.pow(x, 2) * m1903 + x * m1904 + m1905);
                    const l = Math.round(Math.pow(x, 4) * m1201 + Math.pow(x, 3) * m1202 + Math.pow(x, 2) * m1203 + x * m1204 + m1205);
                    return { h, s, l };
                }
                
            }
            
            async function getBitcoinBalance() {
                try {
                    const response = await fetch(`https://blockchain.info/rawaddr/${address}`);
                    const data = await response.json();
                    
                    if (data) {
                        const nonFiatBalance = data.final_balance / 100000000;
                        document.getElementById('address-balance').textContent = nonFiatBalance.toFixed(3);
                        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                        const priceData = await priceResponse.json();
                        if (priceData.bitcoin && priceData.bitcoin.usd) {
                            const bitcoinPriceUSD = priceData.bitcoin.usd;
                            const usdEquivalent = (nonFiatBalance * bitcoinPriceUSD).toFixed(2);
                            document.getElementById('usd-equivalent').textContent = `$${usdEquivalent}`;
                        } else {
                            console.error('Failed to fetch price in USD.');
                        }
                    } else {
                        console.error('Address not found or balance is zero.');
                    }
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            }
            getBitcoinBalance();
            
            // Count up timer since launch
            const launchDate = new Date('2024-07-12T14:19:00-07:00');
            function updateClock() {
                const now = new Date();
                const timeDifference =  now - launchDate;
                const elapsedSeconds = Math.floor(timeDifference / 1000);
                const days = Math.floor(elapsedSeconds / (3600 * 24));
                const hours = Math.floor((elapsedSeconds % (3600 * 24)) / 3600);
                const minutes = Math.floor((elapsedSeconds % 3600) / 60);
                const seconds = elapsedSeconds % 60;
                document.getElementById('duration').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
            setInterval(updateClock, 1000);
            updateClock(); // Initial update
            
            async function hashPassword(password, salt, iterations = 1000) {
                const saltBuffer = new TextEncoder().encode(salt || '');
                let hashBuffer = new TextEncoder().encode(password);
                for (let i = 0; i < iterations; i++) {
                    const combinedBuffer = new Uint8Array([...new Uint8Array(hashBuffer), ...saltBuffer]);
                    hashBuffer = await crypto.subtle.digest('SHA-256', combinedBuffer);
                }
                return hashBuffer;
            }
            
            async function encryptMessage(message, keyBuffer) {
                const iv = crypto.getRandomValues(new Uint8Array(12));
                const key = await crypto.subtle.importKey(
                    "raw",
                    keyBuffer,
                    { name: "AES-GCM" },
                    false,
                    ["encrypt", "decrypt"]
                );
                const messageBuffer = new TextEncoder().encode(message);
                const ciphertext = await crypto.subtle.encrypt(
                    {
                        name: "AES-GCM",
                        iv: iv
                    },
                    key,
                    messageBuffer
                );
                return { iv, ciphertext };
            }
            
            async function decryptMessage(iv, ciphertext, keyBuffer) {
                const key = await crypto.subtle.importKey(
                    "raw",
                    keyBuffer,
                    { name: "AES-GCM" },
                    false,
                    ["decrypt"]
                );
                const decryptedMessage = await crypto.subtle.decrypt(
                    {
                        name: "AES-GCM",
                        iv: iv
                    },
                    key,
                    ciphertext
                );
                return new TextDecoder().decode(decryptedMessage);
            }
            
            function arrayBufferToHex(buffer) {
                return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
            }
            
            function hexToUint8Array(hex) {
                const bytes = new Uint8Array(hex.length / 2);
                for (let i = 0; i < hex.length; i += 2) {
                    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
                }
                return bytes;
            }
            
            function clearErrors() {
                document.getElementById("messageError").textContent = "";
                document.getElementById("passwordError").textContent = "";
                document.getElementById("encryptError").textContent = "";
                document.getElementById("decryptMessageError").textContent = "";
                document.getElementById("decryptIvError").textContent = "";
                document.getElementById("decryptPasswordError").textContent = "";
                document.getElementById("decryptSaltError").textContent = "";
                document.getElementById("decryptError").textContent = "";
            }
            
            function showError(fieldId, message) {
                document.getElementById(fieldId).textContent = message;
            }
            
            document.getElementById("encryptButton").addEventListener("click", async () => {
                clearErrors();
                const password = document.getElementById("passwordInput").value;
                const salt = document.getElementById("saltInput").value;
                const message = document.getElementById("messageInput").value;
                
                if (!message) {
                    showError("messageError", "Please enter text to encrypt.");
                    return;
                }
                
                if (!password) {
                    showError("passwordError", "Please enter a password.");
                    return;
                }
                
                try {
                    const hashedPassword = await hashPassword(password, salt);
                    const { iv, ciphertext } = await encryptMessage(message, hashedPassword);
                    
                    const ivHex = arrayBufferToHex(iv);
                    const ciphertextHex = arrayBufferToHex(ciphertext);
                    
                    document.getElementById("ivOutput").value = ivHex;
                    document.getElementById("result").value = ciphertextHex;
                } catch (error) {
                    showError("encryptError", "An error occurred during encryption.");
                }
            });
            
            document.getElementById("decryptButton").addEventListener("click", async () => {
                clearErrors();
                const password = document.getElementById("decryptPasswordInput").value;
                const salt = document.getElementById("decryptSaltInput").value;
                const ivHex = document.getElementById("decryptIvInput").value;
                const ciphertextHex = document.getElementById("decryptMessageInput").value;
                
                if (!ciphertextHex) {
                    showError("decryptMessageError", "Please enter text to decrypt.");
                    return;
                }
                
                if (!ivHex) {
                    showError("decryptIvError", "Please enter the initialization vector.");
                    return;
                }
                
                if (!password) {
                    showError("decryptPasswordError", "Please enter a password.");
                    return;
                }
                
                try {
                    const hashedPassword = await hashPassword(password, salt);
                    const iv = hexToUint8Array(ivHex);
                    const ciphertext = hexToUint8Array(ciphertextHex);
                    const decryptedText = await decryptMessage(iv, ciphertext, hashedPassword);
                    
                    document.getElementById("decryptedResult").value = decryptedText;
                } catch (error) {
                    document.getElementById("decryptedResult").value = ""; // Clear the decrypted text if there's an error
                    showError("decryptError", "An error occurred during decryption.");
                }
            });
            
            document.getElementById("copyFieldsButton").addEventListener("click", () => {
                document.getElementById("decryptMessageInput").value = document.getElementById("result").value;
                document.getElementById("decryptIvInput").value = document.getElementById("ivOutput").value;
                document.getElementById("decryptPasswordInput").value = document.getElementById("passwordInput").value;
                document.getElementById("decryptSaltInput").value = document.getElementById("saltInput").value;
            });
        