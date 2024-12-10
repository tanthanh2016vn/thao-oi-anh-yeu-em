const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

const header = document.querySelector(".header");
canvas.width = header.offsetWidth;
canvas.height = header.offsetHeight;

const snowflakes = [];

// Hàm tạo bông tuyết
function createSnowflake() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 1 + 0.5,
        angle: Math.random() * Math.PI * 2,
    };
}

// Khởi tạo bông tuyết
for (let i = 0; i < 200; i++) { // Giảm số lượng để hiệu suất tốt hơn
    snowflakes.push(createSnowflake());
}

// Hàm vẽ tuyết
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
        // Di chuyển bông tuyết
        snowflake.y += snowflake.speed;
        snowflake.x += Math.sin(snowflake.angle) * 0.5;
        snowflake.angle += 0.01;

        // Nếu bông tuyết rơi khỏi màn hình
        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }

        // Vẽ bông tuyết
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    });

    requestAnimationFrame(drawSnowflakes);
}

// Bắt đầu vẽ
drawSnowflakes();

// START LOAD DANH SÁCH ẢNH THEO THỨ TỰ TRONG FORLDER

window.onload = function () {
    const container = document.getElementById('card-container');

    // Giả sử có 4 ảnh và tiêu đề tương ứng
    const totalImages = 14;

    for (let i = 1; i <= totalImages; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const imgElement = document.createElement('img');
        imgElement.src = `images/doita_${i}.jpg`;  // Lấy ảnh từ folder images
        imgElement.alt = `Image ${i}`;  // Thêm thuộc tính alt cho ảnh

        const cardContentElement = document.createElement('div');
        cardContentElement.classList.add('card-content');

        const h3Element = document.createElement('h3');
        h3Element.textContent = `Đôi ta ${i}`;  // Tiêu đề ảnh

        const pElement = document.createElement('p');
        pElement.textContent = `Image`;  // Mô tả ảnh

        // Thêm các phần tử vào card
        cardContentElement.appendChild(h3Element);
        cardContentElement.appendChild(pElement);
        cardElement.appendChild(imgElement);
        cardElement.appendChild(cardContentElement);

        // Thêm card vào container
        container.appendChild(cardElement);
    }
};

// END LOAD DANH SÁCH ẢNH THEO THỨ TỰ TRONG FORLDER

