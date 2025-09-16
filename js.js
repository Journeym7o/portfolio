// 自定义鼠标指针功能
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.isHoveringImage = false;
        
        this.init();
    }
    
    init() {
        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.updateCursorPosition(e);
        });
        
        // 监听图片hover事件
        this.setupImageHover();
        
        // 监听链接hover事件
        this.setupLinkHover();
        
        // 监听鼠标进入和离开页面
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
    }
    
    updateCursorPosition(e) {
        // 检查模态框是否打开
        const modal = document.getElementById('imageModal');
        if (modal && modal.style.display === 'block') {
            return; // 如果模态框打开，不更新鼠标位置
        }
        
        // 更新鼠标位置
        requestAnimationFrame(() => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });
    }
    
    setupImageHover() {
        // 移除图片hover时的VIEW样式功能
        // 图片hover时不再显示VIEW字样
    }
    
    setupLinkHover() {
        const links = document.querySelectorAll('a, .work-link');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
            });
            
            link.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// 平滑滚动功能
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // 为导航链接添加平滑滚动
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 滚动动画效果
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // 创建Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // 观察所有作品项目
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach(item => {
            observer.observe(item);
        });
        
        // 添加CSS动画类
        this.addAnimationStyles();
    }
    
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .work-item {
                opacity: 0;
                transform: translateY(50px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .work-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// 图片懒加载
class LazyLoad {
    constructor() {
        this.init();
    }
    
    init() {
        const images = document.querySelectorAll('img');
        
        // 确保图片正常显示，不要设置opacity为0
        images.forEach(img => {
            img.style.opacity = '1';
            img.style.display = 'block';
        });
    }
}

// 页面加载动画
class PageLoader {
    constructor() {
        this.init();
    }
    
    init() {
        // 页面加载完成后的动画
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // 标题文字动画
            this.animateTitle();
        });
    }
}

// 响应式导航
class ResponsiveNav {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }
    
    init() {
        // 滚动时隐藏/显示导航
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                // 向下滚动，隐藏导航
                this.header.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动，显示导航
                this.header.style.transform = 'translateY(0)';
            }
            
            this.lastScrollY = currentScrollY;
        });
        
        // 添加过渡效果
        this.header.style.transition = 'transform 0.3s ease';
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否支持鼠标指针（排除触摸设备）
    if (window.matchMedia('(pointer: fine)').matches) {
        new CustomCursor();
    }
    
    new SmoothScroll();
    new ScrollAnimations();
    new LazyLoad();
    new PageLoader();
    new ResponsiveNav();
});

// 性能优化：节流函数
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Tab导航时显示焦点轮廓
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    // 鼠标点击时隐藏焦点轮廓
    document.body.classList.remove('keyboard-nav');
});

// 手风琴功能
class Accordion {
    constructor() {
        this.init();
    }

    init() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const icon = item.querySelector('.accordion-icon');
            
            header.addEventListener('click', () => {
                this.toggleItem(item, icon);
            });
        });
    }

    toggleItem(item, icon) {
        const isActive = item.classList.contains('active');
        
        // 先关闭所有项目（包括当前项目）
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherIcon = otherItem.querySelector('.accordion-icon');
            otherIcon.textContent = '+';
        });
        
        // 如果当前项目不是激活状态，则激活它
        if (!isActive) {
            item.classList.add('active');
            icon.textContent = '−';
        }
    }
}

// 图片放大查看功能
class ImageModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImage');
        this.caption = document.getElementById('caption');
        this.closeBtn = document.querySelector('.close');
        this.init();
    }

    init() {
        // 为所有图片添加点击事件
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('click', (e) => {
                this.openModal(e.target);
            });
        });

        // 关闭按钮事件
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // 点击模态框背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openModal(img) {
        this.modal.style.display = 'block';
        this.modalImg.src = img.src;
        this.modalImg.alt = img.alt;
        
        // 显示图片说明（如果有figcaption）
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        if (figcaption) {
            this.caption.textContent = figcaption.textContent;
            this.caption.style.display = 'block';
        } else {
            this.caption.style.display = 'none';
        }

        // 防止背景滚动
        document.body.style.overflow = 'hidden';
        
        // 完全隐藏自定义鼠标指针
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.display = 'none';
            cursor.style.opacity = '0';
            cursor.style.visibility = 'hidden';
        }
        
        // 禁用body的cursor样式
        document.body.style.cursor = 'default';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // 完全恢复自定义鼠标指针
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.display = 'block';
            cursor.style.opacity = '1';
            cursor.style.visibility = 'visible';
        }
        
        // 恢复body的cursor样式
        document.body.style.cursor = 'none';
    }
}

// 图片轮播功能
class ImageCarousel {
    constructor(trackId = 'carouselTrack', prevId = 'prevBtn', nextId = 'nextBtn') {
        this.track = document.getElementById(trackId);
        this.prevBtn = document.getElementById(prevId);
        this.nextBtn = document.getElementById(nextId);
        this.slides = this.track ? this.track.querySelectorAll('.carousel-slide:not(.clone)') : [];
        this.allSlides = this.track ? this.track.querySelectorAll('.carousel-slide') : [];
        this.currentIndex = 1; // 从第一张真实图片开始
        this.slideWidth = 100; // 100% width for single slide display
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (!this.track || !this.prevBtn || !this.nextBtn) return;
        
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // 触摸支持
        this.addTouchSupport();
        
        // 初始化位置（显示第一张真实图片）
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.currentIndex--;
        this.updateCarousel();
        
        // 如果到达克隆的第一张图片，无缝跳转到最后一张真实图片
        if (this.currentIndex === 0) {
            setTimeout(() => {
                this.track.style.transition = 'none';
                this.currentIndex = this.slides.length;
                this.updateCarousel();
                setTimeout(() => {
                    this.track.style.transition = 'transform 0.5s ease';
                    this.isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.currentIndex++;
        this.updateCarousel();
        
        // 如果到达克隆的最后一张图片，无缝跳转到第一张真实图片
        if (this.currentIndex === this.allSlides.length - 1) {
            setTimeout(() => {
                this.track.style.transition = 'none';
                this.currentIndex = 1;
                this.updateCarousel();
                setTimeout(() => {
                    this.track.style.transition = 'transform 0.5s ease';
                    this.isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * this.slideWidth;
        this.track.style.transform = `translateX(${translateX}%)`;
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
}

// 初始化手风琴和图片模态框
document.addEventListener('DOMContentLoaded', () => {
    new Accordion();
    new ImageModal();
    new ImageCarousel('carouselTrack', 'prevBtn', 'nextBtn');
    new ImageCarousel('carouselTrack2', 'prevBtn2', 'nextBtn2');
    new ImageCarousel('carouselTrack3', 'prevBtn3', 'nextBtn3');
});


