const snowflakesContainer = document.querySelector('.snowflakes');
const snowflakeCount = 150; // Tăng số lượng tuyết để hiệu ứng đẹp hơn

for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    const size = Math.random() * 8 + 2; // Kích thước ngẫu nhiên 2-10px
    const duration = Math.random() * 10 + 5; // Thời gian rơi 5-15s
    const position = Math.random() * 100; // Vị trí ngang ngẫu nhiên
    const swayDuration = Math.random() * 4 + 3; // Chuyển động lắc 3-7s

    snowflake.classList.add('snowflake');
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${position}%`;
    snowflake.style.animationDuration = `${duration}s, ${swayDuration}s`;
    snowflake.style.opacity = Math.random(); // Độ mờ ngẫu nhiên

    snowflakesContainer.appendChild(snowflake);
}
