/* ===================================================
   TRANG WEB QUÀ TẶNG 20/10 CHO BÉ IU HEO
   Interactive Script & Logic
=================================================== */

// Sound synthesis using Web Audio API (zero external sound file dependencies!)
class SoundFX {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Âm thanh khi con vịt chạy trốn (tiếng pop/vút ngộ nghĩnh)
    playFlee() {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            
            const now = this.ctx.currentTime;
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
            
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.13);
        } catch (e) {
            console.log("Audio FX error", e);
        }
    }

    // Âm thanh khi nhập sai mật khẩu (tiếng 'tò te' ngộ nghĩnh)
    playWrong() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.linearRampToValueAtTime(140, now + 0.25);
            
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.26);
        } catch (e) {
            console.log("Audio FX error", e);
        }
    }

    // Âm thanh khi mở khóa đúng mật khẩu (chime vui tai)
    playSuccess() {
        try {
            this.init();
            if (!this.ctx) return;
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const now = this.ctx.currentTime + idx * 0.08;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);
                
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.32);
            });
        } catch (e) {
            console.log("Audio FX error", e);
        }
    }

    // Âm thanh khi ấn vào chú chó Corgi (chuông tim lấp lánh)
    playLoveChime() {
        try {
            this.init();
            if (!this.ctx) return;
            const freqs = [659.25, 880.00, 987.77, 1318.51, 1567.98];
            freqs.forEach((freq, i) => {
                const now = this.ctx.currentTime + i * 0.09;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.42);
            });
        } catch (e) {
            console.log("Audio FX error", e);
        }
    }

    // Âm thanh khi ấn vào hộp quà (tưng tưng cao dần theo từng lần click)
    playGiftTap(step) {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const baseFreq = 340 + step * 120;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.12);
            
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.13);
        } catch (e) {
            console.log("Audio FX error", e);
        }
    }

    // Âm thanh khi hứng được mảnh trái tim (chime cao dần theo từng mảnh)
    playCatchHeart(count) {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const baseFreq = 540 + (count || 1) * 85;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.16);
        } catch (e) {
            console.log("Audio FX error", e);
        }
    }

    // Âm thanh tiếng cún sủa mừng rỡ (gâu gâu vui tai)
    playPuppyBark() {
        try {
            this.init();
            if (!this.ctx) return;
            [0, 0.16].forEach((offset) => {
                const now = this.ctx.currentTime + offset;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(540, now + 0.05);
                osc.frequency.exponentialRampToValueAtTime(260, now + 0.13);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.13);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.14);
            });
        } catch (e) {
            console.log("Audio FX error", e);
        }
    }
}

const sfx = new SoundFX();

// STATE QUẢN LÝ ỨNG DỤNG
let currentStep = 1;
let isDuckCoConverted = false;
let corgiClicked = false;

// DOM ELEMENTS
document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    initFloatingHearts();
    initMusicPlayer();
    initStepNavigation();
    initPasswordGate();
    initGiftBox();
    initFeedbackAndHeartGame();
    initTrollStage();
    initMemoryVideoFallback();
});

/* ===================================================
   1. ĐIỀU HƯỚNG CÁC BƯỚC (STEP WIZARD - 8 STEPS)
=================================================== */
function goToStep(stepNum) {
    if (stepNum < 1 || stepNum > 8) return;

    const previousStepEl = document.getElementById(`step-${currentStep}`);
    const nextStepEl = document.getElementById(`step-${stepNum}`);

    if (previousStepEl) {
        previousStepEl.classList.remove("active");
    }

    // Pause video ở step 4 nếu đang phát khi chuyển bước
    const memoryVideo = document.getElementById("custom-memory-video");
    if (memoryVideo && !memoryVideo.paused) {
        memoryVideo.pause();
    }

    // Dọn dẹp mini game nếu rời khỏi step 6
    if (currentStep === 6 && stepNum !== 6) {
        stopHeartGame();
    }

    // Dọn dẹp sân khấu troll nếu rời khỏi step 7
    if (currentStep === 7 && stepNum !== 7) {
        stopCorgiTracker();
        clearDuckWanderTimers();
        clearTrollHintTimer();
    }

    currentStep = stepNum;

    if (nextStepEl) {
        nextStepEl.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Khởi động lại trạng thái khi vào step 6 (Khảo sát cảm xúc & Game)
    if (stepNum === 6) {
        resetFeedbackViews();
    }

    // Kích hoạt video nền nenTroll nếu vào step 7 (sân khấu Troll)
    if (stepNum === 7) {
        const trollVideo = document.getElementById("troll-bg-video");
        if (trollVideo) {
            trollVideo.currentTime = 0;
            trollVideo.play().catch(() => {});
        }
        resetTrollStage();
    }

    // Hiệu ứng pháo hoa rực rỡ khi vào bước 8 (kết thúc)
    if (stepNum === 8) {
        launchFinalConfetti();
    }
}

function initStepNavigation() {
    // Nút Next ở Step 1
    const btnStep1 = document.getElementById("btn-step-1");
    if (btnStep1) {
        btnStep1.addEventListener("click", () => {
            sfx.init();
            tryPlayMusic();
            goToStep(2);
        });
    }

    // Nút Next ở Step 2
    const btnStep2 = document.getElementById("btn-step-2");
    if (btnStep2) {
        btnStep2.addEventListener("click", () => {
            sfx.init();
            goToStep(3);
        });
    }

    // Nút Next ở Step 4 (chuyển sang bước 5: Hộp quà)
    const btnStep4 = document.getElementById("btn-step-4");
    if (btnStep4) {
        btnStep4.addEventListener("click", () => {
            sfx.init();
            goToStep(5);
        });
    }

    // Nút Restart ở Step 7 (Xem lại từ đầu)
    const btnRestart = document.getElementById("btn-restart");
    if (btnRestart) {
        btnRestart.addEventListener("click", () => {
            sfx.init();
            // Reset input mật khẩu
            const pwdInput = document.getElementById("password-input");
            if (pwdInput) {
                pwdInput.value = "";
                pwdInput.disabled = false;
            }
            const submitBtn = document.getElementById("btn-submit-password");
            if (submitBtn) {
                submitBtn.disabled = false;
            }
            const wrongAlert = document.getElementById("wrong-password-alert");
            if (wrongAlert) wrongAlert.classList.add("hidden");
            const correctAlert = document.getElementById("correct-password-alert");
            if (correctAlert) correctAlert.classList.add("hidden");
            const lockIcon = document.getElementById("lock-icon");
            if (lockIcon) {
                lockIcon.classList.add("fa-lock");
                lockIcon.classList.remove("fa-lock-open");
                lockIcon.style.color = "";
            }

            // Reset hộp quà ở step 5
            resetGiftBox();

            // Reset trang khảo sát cảm xúc & mini-game ở step 6
            resetFeedbackViews();

            goToStep(1);
        });
    }
}

/* ===================================================
   2. TRANG 3: KIỂM TRA MẬT KHẨU (HONGPHONG)
=================================================== */
function initPasswordGate() {
    const input = document.getElementById("password-input");
    const submitBtn = document.getElementById("btn-submit-password");
    const clearBtn = document.getElementById("btn-clear-input");
    const wrongAlert = document.getElementById("wrong-password-alert");
    const correctAlert = document.getElementById("correct-password-alert");
    const lockBox = document.getElementById("lock-card-box");
    const lockIcon = document.getElementById("lock-icon");

    if (!input || !submitBtn) return;

    // Hiển thị nút xóa khi có chữ
    input.addEventListener("input", () => {
        if (clearBtn) {
            clearBtn.style.display = input.value.length > 0 ? "block" : "none";
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            input.value = "";
            clearBtn.style.display = "none";
            input.focus();
        });
    }

    // Xử lý xác nhận mật khẩu (bắt buộc chính xác là HONGPHONG, không chấp nhận chữ thường)
    function handlePasswordCheck() {
        sfx.init();
        const enteredVal = input.value.trim();

        if (!enteredVal) {
            input.focus();
            return;
        }

        // Mật khẩu bắt buộc chính xác từng ký tự: HONGPHONG
        if (enteredVal === "HONGPHONG") {
            // Đúng mật khẩu
            wrongAlert.classList.add("hidden");
            correctAlert.classList.remove("hidden");
            input.disabled = true;
            submitBtn.disabled = true;
            
            if (lockIcon) {
                lockIcon.classList.remove("fa-lock");
                lockIcon.classList.add("fa-lock-open");
                lockIcon.style.color = "#2ed573";
            }

            sfx.playSuccess();

            // Bắn confetti chúc mừng
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                setTimeout(() => {
                    confetti({
                        particleCount: 60,
                        spread: 80,
                        origin: { y: 0.5 }
                    });
                }, 1500);
            }

            // Tạm giữ trang trong 4 giây để xem thông báo rồi mới chuyển bước
            setTimeout(() => {
                goToStep(4);
            }, 4000);

        } else {
            // Sai mật khẩu (bao gồm cả hongphong chữ thường)
            correctAlert.classList.add("hidden");
            wrongAlert.classList.remove("hidden");

            const wrongMsg = document.getElementById("wrong-message-text");
            if (wrongMsg) {
                if (enteredVal.toLowerCase() === "hongphong") {
                    wrongMsg.textContent = '"Đã bảo phải VIẾT IN HOA mà lại viết chữ thường rồi kìaa! Nhập lại đi 😜"';
                } else {
                    wrongMsg.textContent = '"Sai rồi nhee, nhập lại đi, k biết thì đi hỏi \'cục cức trôi sông kìaa\' 😜"';
                }
            }

            // Rung lắc ô nhập
            if (lockBox) {
                lockBox.classList.remove("shake-animation");
                void lockBox.offsetWidth; // Trigger reflow
                lockBox.classList.add("shake-animation");
            }

            sfx.playWrong();
            input.select();
        }
    }

    submitBtn.addEventListener("click", handlePasswordCheck);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handlePasswordCheck();
        }
    });
}

/* ===================================================
   3. TRANG 5: HỘP QUÀ BẤT NGỜ (GACHA WISH SIMULATOR)
=================================================== */
let giftClickCount = 0;
let giftOpened = false;
let ogeeTimerInterval = null;
let ogeeRemainingSeconds = 5;

function initGiftBox() {
    const giftBox = document.getElementById("gift-box");
    const giftStatusText = document.getElementById("gift-status-text");
    const nextArea = document.getElementById("gift-next-container");
    const btnOgee = document.getElementById("btn-ogee");
    const btnOgeeText = document.getElementById("btn-ogee-text");
    const countdownSec = document.getElementById("ogee-countdown-sec");
    const timerHint = document.getElementById("ogee-timer-hint");

    if (!giftBox) return;

    giftBox.addEventListener("click", () => {
        if (giftOpened) return;
        sfx.init();

        giftClickCount++;
        sfx.playGiftTap(giftClickCount);

        // Hiệu ứng rung theo từng cấp độ
        giftBox.classList.remove("shake-1", "shake-2", "shake-3");
        void giftBox.offsetWidth; // trigger reflow

        // Cập nhật các icon tim tiến trình (1/4 -> 4/4)
        for (let i = 1; i <= 4; i++) {
            const dot = document.getElementById(`dot-${i}`);
            if (dot) {
                if (i <= giftClickCount) {
                    dot.textContent = "💖";
                    dot.classList.add("active");
                } else {
                    dot.textContent = "🤍";
                    dot.classList.remove("active");
                }
            }
        }

        if (giftClickCount === 1) {
            giftBox.classList.add("shake-1");
            if (giftStatusText) {
                giftStatusText.textContent = "Ủa nắp chặt dữ dị? Nhấn thêm nữa đii 😆 (1/4)";
            }
        } else if (giftClickCount === 2) {
            giftBox.classList.add("shake-2");
            if (giftStatusText) {
                giftStatusText.textContent = "Rung rinh rồi nèe, nhấn tiếp đi nàooo! (2/4)";
            }
        } else if (giftClickCount === 3) {
            giftBox.classList.add("shake-3");
            if (giftStatusText) {
                giftStatusText.textContent = "Sắp bung rùi bé ơiii, 1 cái nữa thuiii! 💥 (3/4)";
            }
        } else if (giftClickCount >= 4) {
            // MỞ QUÀ THÀNH CÔNG!
            giftOpened = true;
            giftBox.classList.remove("shake-1", "shake-2", "shake-3");
            giftBox.classList.add("gift-opened");

            if (giftStatusText) {
                giftStatusText.innerHTML = "BÙM! Mở quà thành công rùi nheee! 🎉 (4/4)";
            }

            sfx.playSuccess();

            // Bắn pháo hoa giấy chúc mừng
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#ffe066', '#ff4b72', '#ff758c', '#ffffff']
                });
            }

            // MỞ WEB Ở TAB MỚI (giữ nguyên tab hiện tại)
            window.open("https://wishsimulator.app/?banner=635781285", "_blank");

            // Hiển thị khu vực bước tiếp theo với nút Ogee
            if (nextArea) {
                nextArea.classList.remove("hidden");
            }

            // Bắt đầu đếm ngược tối thiểu 30s
            startOgeeCountdown();
        }
    });

    // Xử lý nút Ogee
    if (btnOgee) {
        btnOgee.addEventListener("click", () => {
            if (btnOgee.disabled) {
                sfx.playWrong();
                return;
            }
            sfx.init();
            goToStep(6); // Chuyển sang trang troll (step 6)
        });
    }
}

function startOgeeCountdown() {
    if (ogeeTimerInterval) clearInterval(ogeeTimerInterval);
    ogeeRemainingSeconds = 5;

    const btnOgee = document.getElementById("btn-ogee");
    const btnOgeeText = document.getElementById("btn-ogee-text");
    const countdownSec = document.getElementById("ogee-countdown-sec");
    const timerHint = document.getElementById("ogee-timer-hint");

    if (btnOgee) {
        btnOgee.disabled = true;
        btnOgee.classList.remove("ready");
    }
    if (btnOgeeText) {
        btnOgeeText.textContent = `Ogee (${ogeeRemainingSeconds}s)`;
    }
    if (countdownSec) {
        countdownSec.textContent = ogeeRemainingSeconds;
    }

    ogeeTimerInterval = setInterval(() => {
        ogeeRemainingSeconds--;

        if (countdownSec) {
            countdownSec.textContent = Math.max(0, ogeeRemainingSeconds);
        }
        if (btnOgeeText) {
            btnOgeeText.textContent = `Ogee (${ogeeRemainingSeconds}s)`;
        }

        if (ogeeRemainingSeconds <= 0) {
            clearInterval(ogeeTimerInterval);
            ogeeTimerInterval = null;

            if (btnOgee) {
                btnOgee.disabled = false;
                btnOgee.classList.add("ready");
            }
            if (btnOgeeText) {
                btnOgeeText.textContent = "Ogee nèee ✨";
            }
            if (timerHint) {
                timerHint.innerHTML = "✨ Đã đủ 5s rùi nè! Giờ bé có thể bấm nút <b>Ogee</b> để tiếp tục nha 💕";
            }

            // Bắn một đợt confetti nhẹ báo hiệu nút đã sẵn sàng
            if (typeof confetti === 'function' && currentStep === 5) {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.8 }
                });
            }
        }
    }, 1000);
}

function resetGiftBox() {
    if (ogeeTimerInterval) {
        clearInterval(ogeeTimerInterval);
        ogeeTimerInterval = null;
    }
    giftClickCount = 0;
    giftOpened = false;
    ogeeRemainingSeconds = 5;

    const giftBox = document.getElementById("gift-box");
    if (giftBox) {
        giftBox.classList.remove("gift-opened", "shake-1", "shake-2", "shake-3");
    }

    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
            dot.textContent = "🤍";
            dot.classList.remove("active");
        }
    }

    const giftStatusText = document.getElementById("gift-status-text");
    if (giftStatusText) {
        giftStatusText.textContent = "Bấm vào hộp quà để mở nè! (0/4) 👆";
    }

    const nextArea = document.getElementById("gift-next-container");
    if (nextArea) {
        nextArea.classList.add("hidden");
    }

    const btnOgee = document.getElementById("btn-ogee");
    const btnOgeeText = document.getElementById("btn-ogee-text");
    const timerHint = document.getElementById("ogee-timer-hint");

    if (btnOgee) {
        btnOgee.disabled = true;
        btnOgee.classList.remove("ready");
    }
    if (btnOgeeText) {
        btnOgeeText.textContent = "Ogee (5s)";
    }
    if (timerHint) {
        timerHint.innerHTML = '⏳ Bé cứ thong thả mở tab roll tối thiểu 5s nha... (<span id="ogee-countdown-sec">5</span>s)';
    }
}

/* ===================================================
   4. TRANG 6: CẢM XÚC CỦA HEO & TRÒ CHƠI HỨNG MẢNH TRÁI TIM
=================================================== */

// Game state variables
let heartGameScore = 0;
const HEART_GAME_TARGET = 5;
let heartGameRunning = false;
let heartGameRaf = null;
let fallingHearts = [];
let catcherX = 260; // Initial X in px
let loveProceedTimer = null;
let paimonMeuTimer = null;
let gameCompleteTimer = null;
let gameCountdownInterval = null;

function initFeedbackAndHeartGame() {
    // 1. DOM Elements
    const btnFbCo = document.getElementById("btn-fb-co");
    const btnFbKhong = document.getElementById("btn-fb-khong");
    const btnReallyTrue = document.getElementById("btn-really-true");
    const btnReallyJoke = document.getElementById("btn-really-joke");
    const btnLoveProceed = document.getElementById("btn-love-proceed");
    const btnPaimonMeuNext = document.getElementById("btn-paimon-meu-next");
    const btnGameInstantNext = document.getElementById("btn-game-instant-next");

    // Views
    const viewQuestion = document.getElementById("fb-view-question");
    const viewReally = document.getElementById("fb-view-really");
    const viewLove = document.getElementById("fb-view-love");
    const viewPaimonMeu = document.getElementById("fb-view-paimon-meu");
    const viewGame = document.getElementById("fb-view-game");

    function showView(targetView) {
        [viewQuestion, viewReally, viewLove, viewPaimonMeu, viewGame].forEach(v => {
            if (v) v.classList.add("hidden");
        });
        if (targetView) {
            targetView.classList.remove("hidden");
            void targetView.offsetWidth; // trigger reflow for smooth animation
        }
    }

    // A. BẤM "Cóo": Đổi thành giao diện "Thật luôn"
    if (btnFbCo) {
        btnFbCo.addEventListener("click", () => {
            sfx.playSuccess();
            showView(viewReally);
        });
    }

    // B. BẤM "Khongg": Chuyển sang giao diện trò chơi chữa lành trái tim
    if (btnFbKhong) {
        btnFbKhong.addEventListener("click", () => {
            sfx.playWrong();
            showView(viewGame);
            startHeartGame();
        });
    }

    // C. BẤM "1. Thậtt": Đổi sang "Yêu thíaaa"
    if (btnReallyTrue) {
        btnReallyTrue.addEventListener("click", () => {
            sfx.playLoveChime();
            showView(viewLove);

            // Bắn confetti chúc mừng
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#ff4081', '#ff79b0', '#ffffff', '#ffd700']
                });
            }

            // Tự động chuyển tiếp sau 4 giây hoặc có thể nhấn nút Next
            if (loveProceedTimer) clearTimeout(loveProceedTimer);
            loveProceedTimer = setTimeout(() => {
                goToStep(7);
            }, 4000);
        });
    }

    // Nút next ở view "Yêu thíaaa"
    if (btnLoveProceed) {
        btnLoveProceed.addEventListener("click", () => {
            if (loveProceedTimer) clearTimeout(loveProceedTimer);
            sfx.init();
            goToStep(7);
        });
    }

    // D. BẤM "2. Khom, đùa á": Hiển thị PaimonMeu.jpg và chuyển sang giao diện "Khongg"
    if (btnReallyJoke) {
        btnReallyJoke.addEventListener("click", () => {
            sfx.playWrong();
            showView(viewPaimonMeu);

            // Dừng 5s rồi tự động vào mini-game (không cần hiển thị chữ đếm ngược)
            if (paimonMeuTimer) clearTimeout(paimonMeuTimer);
            paimonMeuTimer = setTimeout(() => {
                showView(viewGame);
                startHeartGame();
            }, 5000);
        });
    }

    if (btnPaimonMeuNext) {
        btnPaimonMeuNext.addEventListener("click", () => {
            if (paimonMeuTimer) clearTimeout(paimonMeuTimer);
            showView(viewGame);
            startHeartGame();
        });
    }

    // Nút chuyển ngay khi hoàn thành game
    if (btnGameInstantNext) {
        btnGameInstantNext.addEventListener("click", () => {
            if (gameCompleteTimer) clearTimeout(gameCompleteTimer);
            if (gameCountdownInterval) {
                clearInterval(gameCountdownInterval);
                gameCountdownInterval = null;
            }
            stopHeartGame();
            goToStep(7);
        });
    }

    // Khởi tạo điều khiển cho mini game
    setupHeartGameControls();
}

function resetFeedbackViews() {
    if (loveProceedTimer) clearTimeout(loveProceedTimer);
    if (paimonMeuTimer) clearTimeout(paimonMeuTimer);
    if (gameCompleteTimer) clearTimeout(gameCompleteTimer);
    if (gameCountdownInterval) {
        clearInterval(gameCountdownInterval);
        gameCountdownInterval = null;
    }

    stopHeartGame();

    const viewQuestion = document.getElementById("fb-view-question");
    const viewReally = document.getElementById("fb-view-really");
    const viewLove = document.getElementById("fb-view-love");
    const viewPaimonMeu = document.getElementById("fb-view-paimon-meu");
    const viewGame = document.getElementById("fb-view-game");

    if (viewQuestion) viewQuestion.classList.remove("hidden");
    if (viewReally) viewReally.classList.add("hidden");
    if (viewLove) viewLove.classList.add("hidden");
    if (viewPaimonMeu) viewPaimonMeu.classList.add("hidden");
    if (viewGame) viewGame.classList.add("hidden");

    resetHeartGame();
}

/* ===================================================
   LOGIC MINI-GAME HỨNG TRÁI TIM & CHÚ CÚN TƯƠNG TÁC
=================================================== */
function setupHeartGameControls() {
    const arena = document.getElementById("heart-game-arena");
    const catcher = document.getElementById("heart-catcher");
    if (!arena || !catcher) return;

    function handlePointerMove(clientX) {
        if (!heartGameRunning) return;
        const rect = arena.getBoundingClientRect();
        const minX = 140; // Để chừa khoảng trống cho chú cún bên trái
        const maxX = rect.width - 50;
        let x = clientX - rect.left;
        x = Math.max(minX, Math.min(x, maxX));
        catcherX = x;
        catcher.style.left = `${catcherX}px`;

        // Chú cún nhìn theo hướng di chuyển của Trái Tim to
        updatePuppyGaze(catcherX, rect.height - 45);
    }

    // Di chuyển bằng chuột
    arena.addEventListener("mousemove", (e) => {
        handlePointerMove(e.clientX);
    });

    // Vuốt trên màn hình cảm ứng
    arena.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches.length > 0) {
            e.preventDefault();
            handlePointerMove(e.touches[0].clientX);
        }
    }, { passive: false });

    // Hỗ trợ phím mũi tên trái / phải
    window.addEventListener("keydown", (e) => {
        if (!heartGameRunning || currentStep !== 6) return;
        const rect = arena.getBoundingClientRect();
        const minX = 140;
        const maxX = rect.width - 50;

        if (e.key === "ArrowLeft") {
            catcherX = Math.max(minX, catcherX - 25);
            catcher.style.left = `${catcherX}px`;
            updatePuppyGaze(catcherX, rect.height - 45);
        } else if (e.key === "ArrowRight") {
            catcherX = Math.min(maxX, catcherX + 25);
            catcher.style.left = `${catcherX}px`;
            updatePuppyGaze(catcherX, rect.height - 45);
        }
    });
}

// Cập nhật hướng ánh mắt và đầu chú cún nhìn theo Trái Tim to
function updatePuppyGaze(targetX, targetY) {
    const pupilLeft = document.getElementById("pupil-left");
    const pupilRight = document.getElementById("pupil-right");
    const puppyHead = document.getElementById("puppy-head-group");
    const puppySvg = document.getElementById("puppy-svg");

    if (!pupilLeft || !pupilRight || !puppyHead || !puppySvg) return;

    const puppyEyeX = 55;
    const puppyEyeY = 110;

    const dx = targetX - puppyEyeX;
    const dy = targetY - puppyEyeY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.hypot(dx, dy);

    // Di chuyển con ngươi mắt tối đa ~3.2px theo góc
    const maxShiftX = 3.2;
    const maxShiftY = 2.4;
    const shiftX = +(Math.cos(angle) * Math.min(maxShiftX, dist * 0.015)).toFixed(2);
    const shiftY = +(Math.sin(angle) * Math.min(maxShiftY, dist * 0.015)).toFixed(2);

    pupilLeft.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    pupilRight.style.transform = `translate(${shiftX}px, ${shiftY}px)`;

    // Nghiêng nhẹ đầu chú cún theo hướng trái tim
    const headTilt = +(Math.sin(angle) * 5.5).toFixed(2);
    puppyHead.style.transform = `rotate(${headTilt}deg)`;
}

function startHeartGame() {
    resetHeartGame();
    heartGameRunning = true;

    const arena = document.getElementById("heart-game-arena");
    const catcher = document.getElementById("heart-catcher");
    if (!arena || !catcher) return;

    // Định vị catcher ban đầu
    const rect = arena.getBoundingClientRect();
    catcherX = Math.max(160, rect.width * 0.55);
    catcher.style.left = `${catcherX}px`;
    updatePuppyGaze(catcherX, rect.height - 45);

    // Bắt đầu vòng lặp game
    let lastSpawnTime = performance.now();
    let lastFrameTime = performance.now();

    function gameLoop(now) {
        if (!heartGameRunning) return;

        const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
        lastFrameTime = now;

        // Sinh mảnh tim rơi từ trên trời mỗi ~1000ms
        if (now - lastSpawnTime > 1000 && fallingHearts.length < 5 && heartGameScore < HEART_GAME_TARGET) {
            spawnFallingHeart(arena);
            lastSpawnTime = now;
        }

        // Cập nhật toạ độ rơi của từng mảnh tim
        updateFallingHearts(arena, dt);

        heartGameRaf = requestAnimationFrame(gameLoop);
    }

    heartGameRaf = requestAnimationFrame(gameLoop);
}

function spawnFallingHeart(arena) {
    if (!arena) return;
    const container = document.getElementById("falling-hearts-container");
    if (!container) return;

    const rect = arena.getBoundingClientRect();
    const minX = 150; // Tránh rơi trúng đầu cún bên trái
    const maxX = rect.width - 45;
    const spawnX = Math.random() * (maxX - minX) + minX;
    const speed = Math.random() * 45 + 110; // Tốc độ rơi: 110 - 155 px/s

    const heartEl = document.createElement("div");
    heartEl.className = "falling-heart-item";
    heartEl.innerHTML = `
        <svg viewBox="0 0 32 30" class="falling-heart-svg" xmlns="http://www.w3.org/2000/svg">
            <path d="M 16 28 C 4 19 0 10 4 5 C 8 0 14 2 16 6 C 18 2 24 0 28 5 C 32 10 28 19 16 28 Z" fill="#FF1744" stroke="#FF8A80" stroke-width="1.5"/>
            <circle cx="9" cy="7" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        </svg>
    `;
    heartEl.style.left = `${spawnX}px`;
    heartEl.style.top = `-25px`;

    container.appendChild(heartEl);

    fallingHearts.push({
        el: heartEl,
        x: spawnX,
        y: -25,
        speed: speed
    });
}

function updateFallingHearts(arena, dt) {
    const catcher = document.getElementById("heart-catcher");
    if (!arena || !catcher) return;

    const arenaHeight = arena.clientHeight || 380;
    const catcherTop = arenaHeight - 80;
    const catcherBottom = arenaHeight - 10;
    const catcherWidthHalf = 42; // Bán kính hứng

    for (let i = fallingHearts.length - 1; i >= 0; i--) {
        const heart = fallingHearts[i];
        heart.y += heart.speed * dt;
        heart.el.style.top = `${heart.y}px`;

        // KIỂM TRA VA CHẠM VỚI TRÁI TIM TO
        const inY = heart.y >= catcherTop && heart.y <= catcherBottom;
        const inX = Math.abs(heart.x - catcherX) <= catcherWidthHalf;

        if (inY && inX) {
            // HỨNG TRÚNG TIM!
            catchHeartSuccess(heart, arena);
            fallingHearts.splice(i, 1);
            continue;
        }

        // Rơi ra ngoài đáy màn hình
        if (heart.y > arenaHeight + 30) {
            if (heart.el.parentNode) {
                heart.el.parentNode.removeChild(heart.el);
            }
            fallingHearts.splice(i, 1);
        }
    }
}

function catchHeartSuccess(heart, arena) {
    // Hiệu ứng tia sáng bùng nổ tại vị trí hứng
    spawnCatchSparkle(arena, heart.x, heart.y);

    // Xoá phần tử tim rơi
    if (heart.el.parentNode) {
        heart.el.parentNode.removeChild(heart.el);
    }

    heartGameScore++;
    sfx.playCatchHeart(heartGameScore);

    // CẬP NHẬT TRÁI TIM TO: CHUYỂN DẦN TỪ MÀU XÁM THÀNH ĐỎ
    updateCatcherProgress(heartGameScore);

    // CẬP NHẬT CHÚ CÚN BÊN TRÁI & LỜI NÓI
    updatePuppyStateOnScore(heartGameScore);

    // KIỂM TRA ĐẦY TIM (HOÀN THÀNH!)
    if (heartGameScore >= HEART_GAME_TARGET) {
        handleHeartGameComplete();
    }
}

function updateCatcherProgress(score) {
    const clipRect = document.getElementById("catcher-clip-rect");
    const percentLabel = document.getElementById("catcher-percent-label");
    const scoreBadge = document.getElementById("game-score-badge");
    const catcher = document.getElementById("heart-catcher");

    const pct = Math.min(1, score / HEART_GAME_TARGET);
    const fillHeight = Math.round(pct * 90);
    const fillY = 90 - fillHeight;

    if (clipRect) {
        clipRect.setAttribute("y", fillY);
        clipRect.setAttribute("height", fillHeight);
    }

    const percentText = Math.round(pct * 100);
    if (percentLabel) {
        percentLabel.textContent = `${percentText}%`;
    }

    if (scoreBadge) {
        scoreBadge.textContent = `${score} / ${HEART_GAME_TARGET} 💖`;
    }

    if (catcher) {
        catcher.className = `heart-catcher glow-lvl-${score} pop-catch`;
        setTimeout(() => {
            if (catcher) catcher.classList.remove("pop-catch");
        }, 180);
    }
}

function updatePuppyStateOnScore(score) {
    const speechText = document.getElementById("puppy-speech-text");
    const puppyEl = document.getElementById("game-puppy");

    if (!speechText) return;

    if (score === 1) {
        speechText.textContent = "Oa được 1 mảnh gòi nè... 🥺";
    } else if (score === 2) {
        speechText.textContent = "Thêm nữa đi Heo ơiii... 🐾";
    } else if (score === 3) {
        speechText.textContent = "Sắp đầy rồi cố lên bé iu! 🐶";
    } else if (score === 4) {
        speechText.textContent = "Chỉ 1 mảnh nữa thui bé ơiii! ✨";
    }
}

function handleHeartGameComplete() {
    heartGameRunning = false;
    if (heartGameRaf) {
        cancelAnimationFrame(heartGameRaf);
        heartGameRaf = null;
    }

    // DỌN DẸP CÁC MẢNH TIM CÒN RƠI
    fallingHearts.forEach(h => {
        if (h.el && h.el.parentNode) {
            h.el.parentNode.removeChild(h.el);
        }
    });
    fallingHearts = [];

    // CHÚ CÚN VUI RA MẶT KHI ĐẦY TIM!
    const puppyEl = document.getElementById("game-puppy");
    const speechText = document.getElementById("puppy-speech-text");

    if (puppyEl) {
        puppyEl.classList.remove("sad-pup");
        puppyEl.classList.add("happy-pup");
    }

    if (speechText) {
        speechText.textContent = "GÂU GÂU! CÚN VUI RÙIII! YÊU HEO NHIỀU! 🥰💖";
    }

    // ÂM THANH ĂN MỪNG VÀ BẮN PHÁO HOA
    sfx.playPuppyBark();
    setTimeout(() => {
        sfx.playSuccess();
    }, 250);

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 110,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff4081', '#ff1744', '#ffd700', '#ffffff', '#ff80ab']
        });
    }

    // HIỂN THỊ THÔNG BÁO HOÀN THÀNH
    const overlay = document.getElementById("game-complete-overlay");
    if (overlay) {
        overlay.classList.remove("hidden");
    }

    // Dừng lại đúng 6s mới qua trang khác theo yêu cầu ("Sau khi chơi xong trò hứng tim dừng lại 6s mới qua trang khác nha")
    if (gameCompleteTimer) clearTimeout(gameCompleteTimer);
    if (gameCountdownInterval) clearInterval(gameCountdownInterval);

    let secondsLeft = 6;
    const countdownEl = document.getElementById("game-countdown-num");
    if (countdownEl) countdownEl.textContent = "6";

    gameCountdownInterval = setInterval(() => {
        secondsLeft--;
        if (countdownEl) countdownEl.textContent = Math.max(0, secondsLeft);
        if (secondsLeft <= 0) {
            clearInterval(gameCountdownInterval);
            gameCountdownInterval = null;
        }
    }, 1000);

    // Bắn thêm các đợt pháo hoa trong 6 giây dừng lại ăn mừng
    setTimeout(() => {
        if (currentStep === 6 && typeof confetti === 'function') {
            confetti({
                particleCount: 75,
                spread: 70,
                origin: { y: 0.5 },
                colors: ['#ff4081', '#ffeb3b', '#ff80ab']
            });
        }
    }, 2000);

    setTimeout(() => {
        if (currentStep === 6 && typeof confetti === 'function') {
            confetti({
                particleCount: 85,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#00e676', '#ff4081', '#ffffff']
            });
        }
    }, 4000);

    gameCompleteTimer = setTimeout(() => {
        if (gameCountdownInterval) {
            clearInterval(gameCountdownInterval);
            gameCountdownInterval = null;
        }
        stopHeartGame();
        goToStep(7);
    }, 6000);
}

function spawnCatchSparkle(arena, x, y) {
    if (!arena) return;
    const sparkle = document.createElement("div");
    sparkle.className = "catch-sparkle";
    sparkle.textContent = "+1 💖";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    arena.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 800);
}

function stopHeartGame() {
    heartGameRunning = false;
    if (heartGameRaf) {
        cancelAnimationFrame(heartGameRaf);
        heartGameRaf = null;
    }

    fallingHearts.forEach(h => {
        if (h.el && h.el.parentNode) {
            h.el.parentNode.removeChild(h.el);
        }
    });
    fallingHearts = [];
}

function resetHeartGame() {
    stopHeartGame();
    heartGameScore = 0;

    const clipRect = document.getElementById("catcher-clip-rect");
    if (clipRect) {
        clipRect.setAttribute("y", "90");
        clipRect.setAttribute("height", "0");
    }

    const percentLabel = document.getElementById("catcher-percent-label");
    if (percentLabel) {
        percentLabel.textContent = "0%";
    }

    const scoreBadge = document.getElementById("game-score-badge");
    if (scoreBadge) {
        scoreBadge.textContent = "0 / 5 💖";
    }

    const catcher = document.getElementById("heart-catcher");
    if (catcher) {
        catcher.className = "heart-catcher glow-lvl-0";
    }

    const puppyEl = document.getElementById("game-puppy");
    if (puppyEl) {
        puppyEl.classList.remove("happy-pup");
        puppyEl.classList.add("sad-pup");
    }

    const speechText = document.getElementById("puppy-speech-text");
    if (speechText) {
        speechText.textContent = "Hức... Cún buồn quá à... 🥺";
    }

    const overlay = document.getElementById("game-complete-overlay");
    if (overlay) {
        overlay.classList.add("hidden");
    }
}

/* ===================================================
   5. TRANG 7: SÂN KHẤU TROLL (2 CON VỊT + CHÚ CHÓ CORGI & CHÚ CHÓ SHIBA)
=================================================== */

// Toạ độ thực tế của chú chó Corgi theo từng giây trong video nenTroll.mp4
const CORGI_TRAJECTORY = [
    { t: 0.0,  x: 45.5, y: 45.8 },
    { t: 6.0,  x: 45.8, y: 46.0 },
    { t: 12.0, x: 46.0, y: 46.2 },
    { t: 18.0, x: 45.8, y: 46.0 },
    { t: 24.0, x: 45.0, y: 45.5 },
    { t: 30.0, x: 45.0, y: 45.5 },
    { t: 36.0, x: 45.0, y: 45.5 },
    { t: 37.0, x: 46.5, y: 47.0 },
    { t: 38.0, x: 45.5, y: 46.5 },
    { t: 39.0, x: 53.0, y: 55.0 },
    { t: 40.0, x: 72.0, y: 74.0 },
    { t: 41.2, x: 92.0, y: 88.0 },
    { t: 42.0, x: 105.0, y: 96.0 }, // Bơi ra ngoài
    { t: 52.5, x: 85.0, y: 85.0 },  // Chuẩn bị vào lại
    { t: 53.0, x: 70.0, y: 70.0 },  // Nổi ngửa bơi vào
    { t: 54.0, x: 58.0, y: 58.0 },
    { t: 56.0, x: 47.0, y: 47.0 },
    { t: 58.0, x: 45.0, y: 46.0 },
    { t: 60.0, x: 45.5, y: 45.8 }
];

// Toạ độ thực tế của chú chó Shiba khi bơi ra (từ giây 24 đến giây 40)
const SHIBA_TRAJECTORY = [
    { t: 24.0, x: 8.5,  y: 21.5 }, // Vừa bơi vào từ góc trên trái
    { t: 25.0, x: 23.5, y: 36.5 }, // Bơi xuống gần Corgi
    { t: 26.0, x: 35.5, y: 50.0 }, // Tiếp cận hàng dưới Corgi
    { t: 27.0, x: 39.0, y: 53.0 }, // Ổn định ngay dưới Corgi
    { t: 30.0, x: 39.0, y: 53.0 }, // Bơi cùng đàn
    { t: 34.0, x: 39.5, y: 54.0 },
    { t: 36.0, x: 39.0, y: 54.5 }, // Bắt đầu trôi dạt nhẹ
    { t: 37.0, x: 45.5, y: 60.5 }, // Rẽ hướng xuống dưới phải
    { t: 38.0, x: 63.0, y: 80.0 }, // Bơi nhanh ra góc
    { t: 39.0, x: 82.5, y: 97.0 }, // Gần chạm mép màn hình
    { t: 40.0, x: 98.0, y: 105.0 } // Rời khỏi khung hình
];

function interpolateTrajectory(trajectory, t) {
    if (!trajectory || trajectory.length === 0) return { x: 45.0, y: 46.0 };
    if (t <= trajectory[0].t) return { x: trajectory[0].x, y: trajectory[0].y };
    if (t >= trajectory[trajectory.length - 1].t) {
        const last = trajectory[trajectory.length - 1];
        return { x: last.x, y: last.y };
    }
    for (let i = 0; i < trajectory.length - 1; i++) {
        const p1 = trajectory[i];
        const p2 = trajectory[i + 1];
        if (t >= p1.t && t <= p2.t) {
            const ratio = (t - p1.t) / (p2.t - p1.t);
            return {
                x: +(p1.x + (p2.x - p1.x) * ratio).toFixed(1),
                y: +(p1.y + (p2.y - p1.y) * ratio).toFixed(1)
            };
        }
    }
    return { x: 45.0, y: 46.0 };
}

function getCorgiPositionAtTime(currentTime) {
    const t = currentTime % 60;
    return interpolateTrajectory(CORGI_TRAJECTORY, t);
}

function getShibaPositionAtTime(currentTime) {
    const t = currentTime % 60;
    return interpolateTrajectory(SHIBA_TRAJECTORY, t);
}

let corgiTrackerRaf = null;
let duckWanderTimers = [];
let trollHintTimer = null;

function scheduleTrollHint() {
    clearTrollHintTimer();
    trollHintTimer = setTimeout(() => {
        if (currentStep === 7 && !corgiClicked) {
            const statusTip = document.getElementById("troll-status-tip");
            const trollVideo = document.getElementById("troll-bg-video");
            if (statusTip) {
                statusTip.classList.remove("hint-reveal-anim");
                void statusTip.offsetWidth; // trigger reflow
                statusTip.classList.add("hint-reveal-anim");
                const curTime = trollVideo ? (trollVideo.currentTime || 0) % 60 : 0;
                if (curTime >= 24.0 && curTime <= 39.8) {
                    statusTip.innerHTML = "💡 Gợi ý nè: Kìa, có chú chó Shiba vừa bơi ra kìa! Thử bấm vào chú Shiba xem! 🐕💖";
                } else {
                    statusTip.innerHTML = "💡 Gợi ý nè: Thử nhìn xem có chú cún nào đang bơi ở giữa nước hong kìa! 🐶💖";
                }
            }
        }
    }, 20000); // Đúng 20 giây sau mới cho gợi ý!
}

function clearTrollHintTimer() {
    if (trollHintTimer) {
        clearTimeout(trollHintTimer);
        trollHintTimer = null;
    }
}

function startCorgiTracker() {
    stopCorgiTracker();
    const trollVideo = document.getElementById("troll-bg-video");
    const corgiHotspot = document.getElementById("corgi-hotspot");
    const shibaHotspot = document.getElementById("shiba-hotspot");
    const statusTip = document.getElementById("troll-status-tip");

    function track() {
        if (currentStep === 7 && trollVideo) {
            const curTime = trollVideo.currentTime || 0;
            const t = curTime % 60;

            // 1. Theo dõi chú cún Corgi bơi
            if (corgiHotspot) {
                const corgiPos = getCorgiPositionAtTime(curTime);
                corgiHotspot.style.left = `${corgiPos.x}%`;
                corgiHotspot.style.top = `${corgiPos.y}%`;

                // Khi Corgi bơi ra ngoài màn hình (t từ 42s đến 52.5s)
                if (t >= 42.0 && t < 52.5) {
                    corgiHotspot.style.display = "none";
                } else {
                    corgiHotspot.style.display = "flex";
                }
            }

            // 2. Chú chó Shiba xuất hiện từ giây 24 đến giây 40:
            // ĐỔI MỤC TIÊU SANG CHÚ SHIBA KHI SHIBA RA!
            const isShibaActive = (t >= 24.0 && t <= 39.8);
            if (shibaHotspot) {
                if (isShibaActive) {
                    const shibaPos = getShibaPositionAtTime(curTime);
                    shibaHotspot.style.display = "flex";
                    shibaHotspot.style.left = `${shibaPos.x}%`;
                    shibaHotspot.style.top = `${shibaPos.y}%`;
                } else {
                    shibaHotspot.style.display = "none";
                }
            }

            // 3. Cập nhật gợi ý thông minh nếu đang bật gợi ý mà người dùng chưa bấm:
            if (!corgiClicked && statusTip && statusTip.classList.contains("hint-reveal-anim")) {
                if (isShibaActive) {
                    statusTip.innerHTML = "💡 Gợi ý nè: Kìa, có chú chó Shiba vừa bơi ra kìa! Thử bấm vào chú Shiba xem! 🐕💖";
                } else {
                    statusTip.innerHTML = "💡 Gợi ý nè: Thử nhìn xem có chú cún nào đang bơi ở giữa nước hong kìa! 🐶💖";
                }
            }

            corgiTrackerRaf = requestAnimationFrame(track);
        }
    }
    corgiTrackerRaf = requestAnimationFrame(track);
}

function stopCorgiTracker() {
    if (corgiTrackerRaf) {
        cancelAnimationFrame(corgiTrackerRaf);
        corgiTrackerRaf = null;
    }
}

// Bắt đầu cho vịt tự do bơi lội lung tung khắp bản đồ
function startDuckWandering() {
    clearDuckWanderTimers();
    const duckCo = document.getElementById("duck-co");
    const duckKhong = document.getElementById("duck-khong");

    if (duckCo) makeDuckWander(duckCo, 1500, 3200);
    if (duckKhong) makeDuckWander(duckKhong, 1800, 3600);
}

function clearDuckWanderTimers() {
    duckWanderTimers.forEach(id => clearTimeout(id));
    duckWanderTimers = [];
}

function makeDuckWander(duckEl, minDelay = 2000, maxDelay = 3500) {
    if (!duckEl) return;

    function wander() {
        if (currentStep !== 7) return;

        // Nếu vừa bị giật mình né chuột thì đợi thêm xíu rồi bơi tiếp
        if (duckEl.dataset.isFleeing === "true") {
            const timer = setTimeout(wander, 1400);
            duckWanderTimers.push(timer);
            return;
        }

        // Chọn toạ độ ngẫu nhiên khắp toàn bộ mặt hồ (x: 8% đến 84%, y: 12% đến 80%)
        const targetX = Math.floor(Math.random() * 76) + 8;
        const targetY = Math.floor(Math.random() * 66) + 12;

        const currentX = parseFloat(duckEl.style.left) || 50;
        const swimDuration = (Math.random() * 1.6 + 2.4).toFixed(1); // 2.4s đến 4.0s

        duckEl.style.transition = `left ${swimDuration}s cubic-bezier(0.25, 0.1, 0.25, 1), top ${swimDuration}s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s ease`;
        duckEl.style.left = `${targetX}%`;
        duckEl.style.top = `${targetY}%`;

        // Quay đầu chú vịt theo hướng bơi (chỉ lật hình chú vịt, không lật nhãn để chữ không bị ngược)
        const duckGraphic = duckEl.querySelector(".duck-graphic");
        if (targetX < currentX) {
            if (duckGraphic) duckGraphic.style.transform = "scaleX(-1)";
            else duckEl.style.transform = "scaleX(-1)";
        } else {
            if (duckGraphic) duckGraphic.style.transform = "scaleX(1)";
            else duckEl.style.transform = "scaleX(1)";
        }

        const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;
        const timer = setTimeout(wander, nextDelay);
        duckWanderTimers.push(timer);
    }

    const timer = setTimeout(wander, Math.random() * 800 + 400);
    duckWanderTimers.push(timer);
}

// Hàm cho vịt phóng né thật nhanh khi chuột đến gần
function fleeDuck(duckEl) {
    if (!duckEl) return;
    duckEl.dataset.isFleeing = "true";
    duckEl.classList.add("duck-fleeing");

    const curX = parseFloat(duckEl.style.left) || 50;
    const curY = parseFloat(duckEl.style.top) || 50;

    // Chọn vị trí xa vị trí hiện tại ít nhất 30% để né xa hẳn
    let targetX = Math.floor(Math.random() * 74) + 10;
    let targetY = Math.floor(Math.random() * 64) + 14;

    if (Math.abs(targetX - curX) < 28) {
        targetX = curX > 50 ? targetX - 35 : targetX + 35;
    }
    targetX = Math.max(8, Math.min(84, targetX));
    targetY = Math.max(12, Math.min(80, targetY));

    duckEl.style.transition = "left 0.32s cubic-bezier(0.1, 0.9, 0.2, 1), top 0.32s cubic-bezier(0.1, 0.9, 0.2, 1), transform 0.25s ease";
    duckEl.style.left = `${targetX}%`;
    duckEl.style.top = `${targetY}%`;

    const duckGraphic = duckEl.querySelector(".duck-graphic");
    if (targetX < curX) {
        if (duckGraphic) duckGraphic.style.transform = "scaleX(-1)";
        duckEl.style.transform = "scale(1.1)";
    } else {
        if (duckGraphic) duckGraphic.style.transform = "scaleX(1)";
        duckEl.style.transform = "scale(1.1)";
    }

    sfx.playFlee();

    setTimeout(() => {
        duckEl.classList.remove("duck-fleeing");
        duckEl.dataset.isFleeing = "false";
    }, 650);
}

function initTrollStage() {
    const duckCo = document.getElementById("duck-co");
    const duckKhong = document.getElementById("duck-khong");
    const corgiHotspot = document.getElementById("corgi-hotspot");
    const corgiBubble = document.getElementById("corgi-co-bubble");
    const shibaHotspot = document.getElementById("shiba-hotspot");
    const shibaBubble = document.getElementById("shiba-co-bubble");
    const trollToast = document.getElementById("troll-speech-bubble");
    const statusTip = document.getElementById("troll-status-tip");
    const duckCoLabel = document.getElementById("duck-co-label");
    const trollViewport = document.getElementById("troll-viewport");

    // Phát hiện khoảng cách chuột để vịt né từ xa, không cho click trúng!
    function checkProximity(duckEl, mouseX, mouseY, rect) {
        if (!duckEl || duckEl.dataset.isFleeing === "true") return;
        const duckRect = duckEl.getBoundingClientRect();
        const duckCenterX = duckRect.left + duckRect.width / 2 - rect.left;
        const duckCenterY = duckRect.top + duckRect.height / 2 - rect.top;

        const dist = Math.hypot(mouseX - duckCenterX, mouseY - duckCenterY);
        if (dist < 90) { // Khi khoảng cách dưới 90px là né ngay!
            fleeDuck(duckEl);
        }
    }

    if (trollViewport) {
        trollViewport.addEventListener("mousemove", (e) => {
            const rect = trollViewport.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            checkProximity(duckKhong, mouseX, mouseY, rect);
            if (isDuckCoConverted) {
                checkProximity(duckCo, mouseX, mouseY, rect);
            }
        });
    }

    // 1. Con vịt "Khongg": rê chuột hoặc chạm là phóng chạy ngay!
    if (duckKhong) {
        duckKhong.addEventListener("mouseenter", () => fleeDuck(duckKhong));
        duckKhong.addEventListener("touchstart", (e) => {
            e.preventDefault();
            fleeDuck(duckKhong);
        }, { passive: false });
        duckKhong.addEventListener("click", (e) => {
            e.preventDefault();
            fleeDuck(duckKhong);
        });
    }

    // 2. Con vịt "Cóo":
    if (duckCo) {
        duckCo.addEventListener("click", (e) => {
            sfx.init();

            if (!isDuckCoConverted) {
                // Biến hình thành vịt Khongg!
                isDuckCoConverted = true;
                duckCo.classList.remove("duck-co");
                duckCo.classList.add("duck-khong");
                if (duckCoLabel) {
                    duckCoLabel.textContent = "Khongg 🙈";
                }

                if (trollToast) {
                    trollToast.classList.remove("hidden");
                }
                if (statusTip) {
                    statusTip.classList.remove("hint-reveal-anim");
                    statusTip.innerHTML = "Ủa kì dị ta? Giờ có tận 2 con vịt <b>Khongg</b> luôn! 😂";
                }

                sfx.playWrong();

                // Lập tức nhảy né đi chỗ khác
                setTimeout(() => {
                    fleeDuck(duckCo);
                }, 150);

            } else {
                // Đã là Khongg rồi thì cũng né luôn
                fleeDuck(duckCo);
            }
        });

        duckCo.addEventListener("mouseenter", () => {
            if (isDuckCoConverted) fleeDuck(duckCo);
        });
        duckCo.addEventListener("touchstart", (e) => {
            if (isDuckCoConverted) {
                e.preventDefault();
                fleeDuck(duckCo);
            }
        }, { passive: false });
    }

    // 3. Tương tác với chú chó Corgi và chú chó Shiba đang bơi trong nước:
    const onDogSelect = (dogType) => {
        sfx.init();

        if (corgiClicked) return;
        corgiClicked = true;

        // Xoá hẹn giờ gợi ý
        clearTrollHintTimer();

        const isShiba = (dogType === "shiba");
        const chosenBubble = isShiba ? shibaBubble : corgiBubble;
        if (chosenBubble) {
            chosenBubble.classList.remove("hidden");
        }

        sfx.playLoveChime();

        // Bắn confetti trái tim ăn mừng
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 80,
                origin: { y: 0.55 },
                colors: ['#ff4081', '#ff79b0', '#ffeb3b', '#00e5ff']
            });

            // Đợt confetti thứ 2 sau 2.5s tạo không khí vui tươi
            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    spread: 70,
                    origin: { y: 0.5 },
                    colors: ['#ff4081', '#ff69b4', '#ffd700']
                });
            }, 2500);
        }

        if (statusTip) {
            if (isShiba) {
                statusTip.innerHTML = "✨ Aww chú chó Shiba đã chọn <b>CÓ</b> thay bé iu rồi kìaaa! 🐕💖";
            } else {
                statusTip.innerHTML = "✨ Aww chú chó Corgi đã chọn <b>CÓ</b> thay bé iu rồi kìaaa! 🐶💖";
            }
        }

        // Dừng vịt bơi lung tung
        clearDuckWanderTimers();

        // Giữ màn hình đúng 5 giây (bong bóng thoại tiếp tục bám theo chú cún đang bơi) rồi mới sang bước 8
        setTimeout(() => {
            stopCorgiTracker();
            goToStep(8);
        }, 5000);
    };

    // Khi Shiba ra thì mục tiêu ưu tiên là Shiba, bấm vào Shiba ăn điểm ngay
    if (shibaHotspot) {
        shibaHotspot.addEventListener("click", (e) => {
            e.preventDefault();
            onDogSelect("shiba");
        });
        shibaHotspot.addEventListener("touchstart", (e) => {
            e.preventDefault();
            onDogSelect("shiba");
        });
    }

    // Bấm vào Corgi cũng hợp lệ và kích hoạt thành công
    if (corgiHotspot) {
        corgiHotspot.addEventListener("click", (e) => {
            e.preventDefault();
            onDogSelect("corgi");
        });
        corgiHotspot.addEventListener("touchstart", (e) => {
            e.preventDefault();
            onDogSelect("corgi");
        });
    }
}

// Reset lại trạng thái sân khấu troll khi quay lại
function resetTrollStage() {
    isDuckCoConverted = false;
    corgiClicked = false;

    clearDuckWanderTimers();
    stopCorgiTracker();
    clearTrollHintTimer();

    const duckCo = document.getElementById("duck-co");
    const duckKhong = document.getElementById("duck-khong");
    const corgiBubble = document.getElementById("corgi-co-bubble");
    const shibaBubble = document.getElementById("shiba-co-bubble");
    const trollToast = document.getElementById("troll-speech-bubble");
    const statusTip = document.getElementById("troll-status-tip");
    const duckCoLabel = document.getElementById("duck-co-label");
    const corgiHotspot = document.getElementById("corgi-hotspot");
    const shibaHotspot = document.getElementById("shiba-hotspot");

    if (duckCo) {
        duckCo.classList.remove("duck-khong", "duck-fleeing");
        duckCo.classList.add("duck-co");
        duckCo.style.left = "20%";
        duckCo.style.top = "60%";
        duckCo.style.transform = "scale(1)";
        const g1 = duckCo.querySelector(".duck-graphic");
        if (g1) g1.style.transform = "scaleX(1)";
        duckCo.dataset.isFleeing = "false";
        if (duckCoLabel) duckCoLabel.textContent = "Cóo 💖";
    }

    if (duckKhong) {
        duckKhong.classList.remove("duck-fleeing");
        duckKhong.style.left = "72%";
        duckKhong.style.top = "60%";
        duckKhong.style.transform = "scale(1)";
        const g2 = duckKhong.querySelector(".duck-graphic");
        if (g2) g2.style.transform = "scaleX(1)";
        duckKhong.dataset.isFleeing = "false";
    }

    if (corgiHotspot) {
        corgiHotspot.style.left = "45%";
        corgiHotspot.style.top = "46%";
        corgiHotspot.style.display = "flex";
    }

    if (shibaHotspot) {
        shibaHotspot.style.display = "none";
        shibaHotspot.style.left = "8.5%";
        shibaHotspot.style.top = "21.5%";
    }

    if (corgiBubble) corgiBubble.classList.add("hidden");
    if (shibaBubble) shibaBubble.classList.add("hidden");
    if (trollToast) trollToast.classList.add("hidden");
    if (statusTip) {
        statusTip.classList.remove("hint-reveal-anim");
        statusTip.textContent = "Bấm thử xem bé chọn con vịt nào nè? 😉";
    }

    // Khởi động lại hệ thống bơi lội, bám đuôi chú chó Corgi & Shiba và hẹn giờ 20s cho gợi ý
    startCorgiTracker();
    startDuckWandering();
    scheduleTrollHint();
}

/* ===================================================
   4. FALLBACK THÔNG MINH CHO VIDEO Ở STEP 4
=================================================== */
function initMemoryVideoFallback() {
    const memoryVideo = document.getElementById("custom-memory-video");
    if (!memoryVideo) return;

    // Nếu video kỷ niệm ban đầu không tìm thấy, trình duyệt sẽ tự động thử nguồn tiếp theo
    memoryVideo.addEventListener("error", () => {
        console.log("Memory video source not found, fallback ready.");
    }, true);
}

/* ===================================================
   5. HIỆU ỨNG PHÁO HOA ĂN MỪNG TRANG CUỐI (STEP 6)
=================================================== */
function launchFinalConfetti() {
    if (typeof confetti !== 'function') return;

    // Đợt 1: Trái tim bắn ra
    confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.6 },
        shapes: ['circle'],
        colors: ['#ff4b72', '#ff85a1', '#fbb1bd', '#ffd166']
    });

    // Đợt 2: Pháo hoa 2 bên lượn vào
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 400);

    // Đợt 3: Mưa hoa nhẹ
    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 120,
            origin: { y: 0.3 }
        });
    }, 900);
}

/* ===================================================
   6. HẠT ÁNH SÁNG & TRÁI TIM NỀN TỰ ĐỘNG
=================================================== */
function initParticles() {
    const container = document.getElementById("particle-container");
    if (!container) return;

    const count = 22;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        const size = Math.random() * 60 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 12 + 10;
        const delay = Math.random() * 8;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

function initFloatingHearts() {
    const layer = document.getElementById("floating-hearts-layer");
    if (!layer) return;

    const hearts = ["💖", "💕", "🌸", "✨", "💗", "🌷"];
    setInterval(() => {
        if (document.hidden) return;
        const heartEl = document.createElement("div");
        heartEl.className = "mini-heart-float";
        heartEl.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heartEl.style.left = `${Math.random() * 95}%`;
        heartEl.style.fontSize = `${Math.random() * 1.2 + 0.9}rem`;
        heartEl.style.animationDuration = `${Math.random() * 4 + 5}s`;

        layer.appendChild(heartEl);

        setTimeout(() => {
            heartEl.remove();
        }, 9000);
    }, 1800);
}

/* ===================================================
   7. NHẠC NỀN & TRÌNH PHÁT BÀI HÁT TUẦN TỰ (PLAYLIST)
=================================================== */

// Danh sách tất cả bài hát có sẵn trong folder music
const MUSIC_PLAYLIST = [
    {
        id: "default",
        title: "Nhạc Mặc Định",
        artist: "Thư giãn, ngọt ngào",
        file: "music/Default.mp3"
    },
    {
        id: "anh-la-ngoai-le",
        title: "Anh Là Ngoại Lệ Của Em",
        artist: "Phương Ly",
        file: "music/AnhLaNgoaiLeCuaEm.mp3"
    },
    {
        id: "ca-phe",
        title: "Cà Phê",
        artist: "MIN",
        file: "music/CaPhe.mp3"
    },
    {
        id: "co-em-cho",
        title: "Có Em Chờ",
        artist: "MIN ft. Mr.A",
        file: "music/CoEmCho.mp3"
    },
    {
        id: "co-gai-m52",
        title: "Cô Gái M52",
        artist: "HuyR ft. Tùng Viu",
        file: "music/CoGaiM52.mp3"
    },
    {
        id: "dem-cuu",
        title: "Đếm Cừu",
        artist: "Han Sara ft. Kay Trần",
        file: "music/DemCuu.mp3"
    },
    {
        id: "em-be",
        title: "Em Bé",
        artist: "Amee x Karik",
        file: "music/EmBe.mp3"
    },
    {
        id: "hoa-huong-duong",
        title: "Hoa Hướng Dương",
        artist: "Trang",
        file: "music/HoaHuongDuong.mp3"
    }
];

let currentSongIndex = 0;

function initMusicPlayer() {
    const musicBtn = document.getElementById("music-toggle-btn");
    const audio = document.getElementById("bg-music");
    const btnOpenPlaylist = document.getElementById("btn-open-playlist");
    const btnClosePlaylist = document.getElementById("btn-close-playlist");
    const modalPlaylist = document.getElementById("music-playlist-modal");
    const btnQuickNext = document.getElementById("btn-quick-next");
    const btnPlaylistPrev = document.getElementById("btn-playlist-prev");
    const btnPlaylistNext = document.getElementById("btn-playlist-next");

    if (!musicBtn || !audio) return;

    audio.volume = 0.5;

    // Render danh sách bài hát trong popup "Chọn nhạc"
    renderPlaylistItems();

    // Nút gốc: BẬT / TẮT NHẠC
    musicBtn.addEventListener("click", () => {
        sfx.init();
        toggleMainMusic();
    });

    // Mở modal "Chọn nhạc"
    if (btnOpenPlaylist && modalPlaylist) {
        btnOpenPlaylist.addEventListener("click", () => {
            sfx.init();
            modalPlaylist.classList.remove("hidden");
            renderPlaylistItems();
        });
    }

    if (btnClosePlaylist && modalPlaylist) {
        btnClosePlaylist.addEventListener("click", () => {
            modalPlaylist.classList.add("hidden");
        });
    }

    // Đóng modal khi bấm ra ngoài vùng backdrop
    if (modalPlaylist) {
        modalPlaylist.addEventListener("click", (e) => {
            if (e.target === modalPlaylist) {
                modalPlaylist.classList.add("hidden");
            }
        });
    }

    // Tự động phát lần lượt các bài có sẵn trong list khi hết bài ("phát lần lượt các bài có sẵn trong list")
    audio.addEventListener("ended", () => {
        playNextLocalSong();
    });

    // Nút Next nhanh bên cạnh nút "Chọn nhạc"
    if (btnQuickNext) {
        btnQuickNext.addEventListener("click", () => {
            sfx.init();
            playNextLocalSong();
        });
    }

    // Nút Bài trước & Bài tiếp theo trong modal Playlist
    if (btnPlaylistPrev) {
        btnPlaylistPrev.addEventListener("click", () => {
            sfx.init();
            playPrevLocalSong();
        });
    }
    if (btnPlaylistNext) {
        btnPlaylistNext.addEventListener("click", () => {
            sfx.init();
            playNextLocalSong();
        });
    }

    // Thử phát nhạc khi người dùng tương tác đầu tiên trên trang
    const playOnFirstInteraction = () => {
        tryPlayMusic();
        window.removeEventListener("click", playOnFirstInteraction);
        window.removeEventListener("touchstart", playOnFirstInteraction);
    };

    window.addEventListener("click", playOnFirstInteraction, { once: true });
    window.addEventListener("touchstart", playOnFirstInteraction, { once: true });
}

// Bật / tắt nhạc theo nút gốc ("ấn tắt bật theo nút gốc")
function toggleMainMusic() {
    const musicBtn = document.getElementById("music-toggle-btn");
    const audio = document.getElementById("bg-music");

    if (!audio) return;
    if (audio.paused) {
        audio.play().then(() => {
            if (musicBtn) musicBtn.classList.add("playing");
        }).catch(err => {
            console.log("Audio play blocked", err);
        });
    } else {
        audio.pause();
        if (musicBtn) musicBtn.classList.remove("playing");
    }
}

// Render danh sách bài hát trong popup "Chọn nhạc"
function renderPlaylistItems() {
    const container = document.getElementById("playlist-items-container");
    if (!container) return;

    container.innerHTML = "";

    MUSIC_PLAYLIST.forEach((song, idx) => {
        const item = document.createElement("div");
        const isActive = currentSongIndex === idx;
        item.className = `playlist-item ${isActive ? "active" : ""}`;

        item.innerHTML = `
            <div class="playlist-icon">
                <i class="fas fa-music"></i>
            </div>
            <div class="playlist-info">
                <div class="playlist-name">${song.title}</div>
                <div class="playlist-artist">${song.artist}</div>
            </div>
            ${isActive ? '<span class="playlist-status-badge">Đang phát 💖</span>' : ''}
        `;

        item.addEventListener("click", () => {
            selectLocalSong(idx);
            const modalPlaylist = document.getElementById("music-playlist-modal");
            if (modalPlaylist) modalPlaylist.classList.add("hidden");
        });

        container.appendChild(item);
    });
}

// Chọn và phát bài hát từ danh sách local
function selectLocalSong(index) {
    if (index < 0 || index >= MUSIC_PLAYLIST.length) return;

    currentSongIndex = index;

    const audio = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle-btn");
    const nowPlayingTitle = document.getElementById("now-playing-title");
    const song = MUSIC_PLAYLIST[index];

    if (audio) {
        audio.src = song.file;
        audio.loop = false; // Tắt lặp lại 1 bài đơn để sự kiện 'ended' tự động chuyển sang bài tiếp theo
        audio.currentTime = 0;
        audio.play().then(() => {
            if (musicBtn) musicBtn.classList.add("playing");
        }).catch(() => {});
    }

    if (nowPlayingTitle) {
        nowPlayingTitle.textContent = `${index + 1}/${MUSIC_PLAYLIST.length}. ${song.title}`;
    }

    // Làm mới trạng thái active trong popup chọn nhạc
    renderPlaylistItems();
}

// Chuyển sang bài tiếp theo trong danh sách (tự động quay vòng từ bài cuối về bài đầu)
function playNextLocalSong() {
    const nextIndex = (currentSongIndex + 1) % MUSIC_PLAYLIST.length;
    selectLocalSong(nextIndex);
}

// Quay lại bài trước đó trong danh sách
function playPrevLocalSong() {
    const prevIndex = (currentSongIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
    selectLocalSong(prevIndex);
}

function tryPlayMusic() {
    const audio = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle-btn");
    if (audio && audio.paused) {
        audio.play().then(() => {
            if (musicBtn) musicBtn.classList.add("playing");
        }).catch(() => {});
    }
}
