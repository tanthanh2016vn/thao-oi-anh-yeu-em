const countdownElement = document.getElementById('countdown');
const messagesElement = document.getElementById('messages');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const ctx = fireworksCanvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage'); // New background image element

const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.2; // Giảm âm lượng một chút cho nhạc nền

fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

let countdownDate = new Date("Jan 1, 2025 00:00:00").getTime();

let countdownInterval = setInterval(function () {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    countdownElement.innerHTML = `Cùng đếm ngược 💕 ${hours}h ${minutes}p ${seconds}s`;

    if (distance <= 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "";
        triggerFireworks(); // Bắn pháo hoa ngay khi hết giờ
        setInterval(triggerFireworks, 5000); // Bắn pháo hoa mỗi 5 giây sau khi hết giờ
        showNewYearMessages(); // Hiển thị các câu chúc mừng năm mới
        playMusic(); // Phát nhạc khi đếm ngược kết thúc
        showBackgroundImage(); // Hiển thị hình nền khi đếm ngược kết thúc
    }
}, 1000);

// Hàm phát nhạc nền
function playMusic() {
    backgroundMusic.play(); // Bắt đầu phát nhạc nền
}

// Hàm bắn pháo hoa
function triggerFireworks() {
    let particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}

// Đối tượng Particle đại diện cho mỗi viên pháo hoa
function Particle() {
    this.x = Math.random() * fireworksCanvas.width;
    this.y = Math.random() * fireworksCanvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
}

Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.98;
};

Particle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

// Hàm hiển thị từng câu chúc mừng năm mới
// Hàm hiển thị từng câu chúc mừng năm mới
function showNewYearMessages() {
    const messages = [
        "Chúc mừng năm mới 2025, em yêu! ❤️",
        "Chúc em một năm tràn đầy niềm vui và hạnh phúc! 🎉",
        "Hy vọng rằng năm mới sẽ mang lại cho chúng ta nhiều kỷ niệm đẹp. 💫",
        "Anh luôn ở bên em, mãi mãi yêu em ❤️",
        "Chúc em đạt được mọi ước mơ trong năm mới! 🎆🎇",
    ];

    let delay = 0;
    let messageElements = [];

    messages.forEach((message, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.style.fontWeight = "800"; // Đặt chữ đậm
            p.style.color = "white"; // Đặt màu chữ nhẹ nhàng (màu trắng)
            p.innerText = message;
            messagesElement.appendChild(p);
            messageElements.push(p); // Lưu trữ các phần tử câu chúc
        }, delay);
        delay += 3000; // Câu chúc sẽ xuất hiện mỗi 3 giây
    });

    // Sau khi hiển thị hết các câu chúc, ẩn chúng và hiển thị "Thành ❤️ Thảo"
    setTimeout(() => {
        // Ẩn tất cả các câu chúc
        messageElements.forEach(p => {
            p.style.display = "none";
        });

        // Hiển thị "Thành ❤️ Thảo"
        const finalMessage = document.createElement('p');
        finalMessage.style.fontWeight = "800"; // Chữ đậm
        finalMessage.style.fontSize = "32px"; // Kích thước chữ lớn
        finalMessage.style.color = "white"; // Màu trắng
        finalMessage.innerText = "Thành ❤️ Thảo";
        messagesElement.appendChild(finalMessage);
    }, delay);
}

// Hàm hiển thị hình nền khi đếm ngược kết thúc
function showBackgroundImage() {
    backgroundImage.style.display = 'block'; // Hiển thị hình nền
    backgroundImage.style.transition = 'opacity 2s'; // Hiệu ứng mờ dần
    backgroundImage.style.opacity = 1; // Làm cho hình nền sáng lên
}
