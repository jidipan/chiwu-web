// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling (removed - form no longer exists)

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .stat, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Scroll to top functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#1d4ed8';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#2563eb';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = 'zh'; // Default language is Chinese

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        currentLang = savedLang;
    }
    // Always update language on page load to ensure correct display
    updateLanguage(currentLang);

    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        updateLanguage(currentLang);
        localStorage.setItem('preferred-language', currentLang);
    });

    function updateLanguage(lang) {
        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-en][data-zh]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update form placeholders
        const inputs = document.querySelectorAll('[data-placeholder-en][data-placeholder-zh]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) {
                input.placeholder = placeholder;
            }
        });

        // Update language toggle button text
        // Option 1: Show current and available language
        langText.innerHTML = lang === 'en' ? 'EN/<span style="opacity:0.6">中文</span>' : '<span style="opacity:0.6">EN</span>/中文';
        
        // Option 2: Simple version (uncomment to use)
        // langText.textContent = lang === 'en' ? 'EN/CN' : 'CN/EN';
        
        // Option 3: Show target language only (original)
        // langText.textContent = lang === 'en' ? '中文' : 'English';

        // Update page title and meta description
        if (lang === 'zh') {
            document.title = '炽悟科技 - 上海炽悟科技有限公司';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = '炽悟科技 - 为您的业务需求提供专业服务和解决方案';
            }
        } else {
            document.title = 'ChiWu Technology - Shanghai Chiwu Technology Co., Ltd.';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = 'ChiWu Technology - Professional services and solutions for your business needs';
            }
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    // Update notification messages for different languages
    window.showNotificationLang = function(messageKey, type) {
        const messages = {
            'form_incomplete': {
                'en': 'Please fill in all fields',
                'zh': '请填写所有字段'
            },
            'invalid_email': {
                'en': 'Please enter a valid email address',
                'zh': '请输入有效的邮箱地址'
            },
            'form_success': {
                'en': 'Thank you for your message! We\'ll get back to you soon.',
                'zh': '感谢您的留言！我们会尽快回复您。'
            }
        };
        
        const message = messages[messageKey] ? messages[messageKey][currentLang] : messageKey;
        showNotification(message, type);
    };
});

// 完整的WebGL流体效果实现 - 原版
class FluidEffect {
    constructor(config = {}) {
        this.config = {
            SIM_RESOLUTION: config.SIM_RESOLUTION || 128,
            DYE_RESOLUTION: config.DYE_RESOLUTION || 1024,
            DENSITY_DISSIPATION: config.DENSITY_DISSIPATION || 3.5,
            VELOCITY_DISSIPATION: config.VELOCITY_DISSIPATION || 2,
            PRESSURE: config.PRESSURE || 0.1,
            PRESSURE_ITERATIONS: config.PRESSURE_ITERATIONS || 20,
            CURL: config.CURL || 3,
            SPLAT_RADIUS: config.SPLAT_RADIUS || 0.2,
            SPLAT_FORCE: config.SPLAT_FORCE || 6000,
            SHADING: config.SHADING !== undefined ? config.SHADING : true,
            COLOR_UPDATE_SPEED: config.COLOR_UPDATE_SPEED || 10,
            BACK_COLOR: config.BACK_COLOR || { r: 0.5, g: 0, b: 0 },
            TRANSPARENT: config.TRANSPARENT !== undefined ? config.TRANSPARENT : true,
            PAUSED: false
        };
        
        this.canvas = null;
        this.gl = null;
        this.ext = null;
        this.pointers = [this.createPointer()];
        this.programs = {};
        this.framebuffers = {};
        this.lastUpdateTime = Date.now();
        this.colorUpdateTimer = 0.0;
        
        this.init();
    }
    
    createPointer() {
        return {
            id: -1,
            texcoordX: 0,
            texcoordY: 0,
            prevTexcoordX: 0,
            prevTexcoordY: 0,
            deltaX: 0,
            deltaY: 0,
            down: false,
            moved: false,
            color: [0, 0, 0]
        };
    }
    
    init() {
        try {
            this.createCanvas();
            this.setupWebGL();
            if (!this.gl) return;
            this.compileShaders();
            this.initFramebuffers();
            this.setupEventListeners();
            this.startRenderLoop();
            console.log('WebGL Fluid effect initialized successfully');
        } catch (error) {
            console.error('Failed to initialize fluid effect:', error);
        }
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'fluid-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1;
            pointer-events: none;
            display: block;
        `;
        document.body.appendChild(this.canvas);
    }
    
    setupWebGL() {
        const params = {
            alpha: true,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false,
        };
        
        this.gl = this.canvas.getContext('webgl2', params) || 
                  this.canvas.getContext('webgl', params) || 
                  this.canvas.getContext('experimental-webgl', params);
        
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }
        
        const isWebGL2 = !!this.canvas.getContext('webgl2', params);
        let halfFloat;
        let supportLinearFiltering;
        
        if (isWebGL2) {
            this.gl.getExtension('EXT_color_buffer_float');
            supportLinearFiltering = this.gl.getExtension('OES_texture_float_linear');
        } else {
            halfFloat = this.gl.getExtension('OES_texture_half_float');
            supportLinearFiltering = this.gl.getExtension('OES_texture_half_float_linear');
        }
        
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        
        const halfFloatTexType = isWebGL2 ? this.gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES);
        
        let formatRGBA, formatRG, formatR;
        
        if (isWebGL2) {
            formatRGBA = this.getSupportedFormat(this.gl.RGBA16F, this.gl.RGBA, halfFloatTexType);
            formatRG = this.getSupportedFormat(this.gl.RG16F, this.gl.RG, halfFloatTexType);
            formatR = this.getSupportedFormat(this.gl.R16F, this.gl.RED, halfFloatTexType);
        } else {
            formatRGBA = this.getSupportedFormat(this.gl.RGBA, this.gl.RGBA, halfFloatTexType);
            formatRG = this.getSupportedFormat(this.gl.RGBA, this.gl.RGBA, halfFloatTexType);
            formatR = this.getSupportedFormat(this.gl.RGBA, this.gl.RGBA, halfFloatTexType);
        }
        
        this.ext = {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering,
        };
        
        if (!this.ext.supportLinearFiltering) {
            this.config.DYE_RESOLUTION = 256;
            this.config.SHADING = false;
        }
    }
    
    getSupportedFormat(internalFormat, format, type) {
        if (!this.supportRenderTextureFormat(internalFormat, format, type)) {
            switch (internalFormat) {
                case this.gl.R16F:
                    return this.getSupportedFormat(this.gl.RG16F, this.gl.RG, type);
                case this.gl.RG16F:
                    return this.getSupportedFormat(this.gl.RGBA16F, this.gl.RGBA, type);
                default:
                    return null;
            }
        }
        return { internalFormat, format };
    }
    
    supportRenderTextureFormat(internalFormat, format, type) {
        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
        
        const fbo = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        
        const status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
        return status === this.gl.FRAMEBUFFER_COMPLETE;
    }
    
    compileShaders() {
        const vertexShader = `
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform vec2 texelSize;

            void main () {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(texelSize.x, 0.0);
                vR = vUv + vec2(texelSize.x, 0.0);
                vT = vUv + vec2(0.0, texelSize.y);
                vB = vUv - vec2(0.0, texelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;
        
        const copyShader = `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            uniform sampler2D uTexture;

            void main () {
                gl_FragColor = texture2D(uTexture, vUv);
            }
        `;
        
        const clearShader = `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            uniform sampler2D uTexture;
            uniform float value;

            void main () {
                gl_FragColor = value * texture2D(uTexture, vUv);
            }
        `;
        
        const splatShader = `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            uniform sampler2D uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;

            void main () {
                vec2 p = vUv - point.xy;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `;
        
        const advectionShader = `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 texelSize;
            uniform vec2 dyeTexelSize;
            uniform float dt;
            uniform float dissipation;

            vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
                vec2 st = uv / tsize - 0.5;
                vec2 iuv = floor(st);
                vec2 fuv = fract(st);

                vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
                vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
                vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
                vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

                return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
            }

            void main () {
                ${this.ext.supportLinearFiltering ? '' : '#define MANUAL_FILTERING'}
                #ifdef MANUAL_FILTERING
                    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                    vec4 result = bilerp(uSource, coord, dyeTexelSize);
                #else
                    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                    vec4 result = texture2D(uSource, coord);
                #endif
                float decay = 1.0 + dissipation * dt;
                gl_FragColor = result / decay;
            }
        `;
        
        const divergenceShader = `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uVelocity;

            void main () {
                float L = texture2D(uVelocity, vL).x;
                float R = texture2D(uVelocity, vR).x;
                float T = texture2D(uVelocity, vT).y;
                float B = texture2D(uVelocity, vB).y;

                vec2 C = texture2D(uVelocity, vUv).xy;
                if (vL.x < 0.0) { L = -C.x; }
                if (vR.x > 1.0) { R = -C.x; }
                if (vT.y > 1.0) { T = -C.y; }
                if (vB.y < 0.0) { B = -C.y; }

                float div = 0.5 * (R - L + T - B);
                gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
            }
        `;
        
        const curlShader = `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uVelocity;

            void main () {
                float L = texture2D(uVelocity, vL).y;
                float R = texture2D(uVelocity, vR).y;
                float T = texture2D(uVelocity, vT).x;
                float B = texture2D(uVelocity, vB).x;
                float vorticity = R - L - T + B;
                gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
            }
        `;
        
        const vorticityShader = `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uVelocity;
            uniform sampler2D uCurl;
            uniform float curl;
            uniform float dt;

            void main () {
                float L = texture2D(uCurl, vL).x;
                float R = texture2D(uCurl, vR).x;
                float T = texture2D(uCurl, vT).x;
                float B = texture2D(uCurl, vB).x;
                float C = texture2D(uCurl, vUv).x;

                vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                force /= length(force) + 0.0001;
                force *= curl * C;
                force.y *= -1.0;

                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity += force * dt;
                velocity = min(max(velocity, -1000.0), 1000.0);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `;
        
        const pressureShader = `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uDivergence;

            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                float C = texture2D(uPressure, vUv).x;
                float divergence = texture2D(uDivergence, vUv).x;
                float pressure = (L + R + B + T - divergence) * 0.25;
                gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
            }
        `;
        
        const gradientSubtractShader = `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uVelocity;

            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity.xy -= vec2(R - L, T - B);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `;
        
        const displayShaderSource = `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uTexture;
            uniform vec2 texelSize;

            void main () {
                vec3 c = texture2D(uTexture, vUv).rgb;
                ${this.config.SHADING ? '#define SHADING' : ''}
                #ifdef SHADING
                    vec3 lc = texture2D(uTexture, vL).rgb;
                    vec3 rc = texture2D(uTexture, vR).rgb;
                    vec3 tc = texture2D(uTexture, vT).rgb;
                    vec3 bc = texture2D(uTexture, vB).rgb;

                    float dx = length(rc) - length(lc);
                    float dy = length(tc) - length(bc);

                    vec3 n = normalize(vec3(dx, dy, length(texelSize)));
                    vec3 l = vec3(0.0, 0.0, 1.0);

                    float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
                    c *= diffuse;
                #endif

                float a = max(c.r, max(c.g, c.b));
                gl_FragColor = vec4(c, a);
            }
        `;
        
        this.baseVertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShader);
        this.programs.copy = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, copyShader));
        this.programs.clear = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, clearShader));
        this.programs.splat = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, splatShader));
        this.programs.advection = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, advectionShader));
        this.programs.divergence = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, divergenceShader));
        this.programs.curl = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, curlShader));
        this.programs.vorticity = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, vorticityShader));
        this.programs.pressure = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, pressureShader));
        this.programs.gradientSubtract = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, gradientSubtractShader));
        this.programs.display = this.createProgram(this.baseVertexShader, this.compileShader(this.gl.FRAGMENT_SHADER, displayShaderSource));
        
        this.setupBuffers();
    }
    
    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
        }
        
        return shader;
    }
    
    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
        }
        
        program.uniforms = {};
        const uniformCount = this.gl.getProgramParameter(program, this.gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const uniformName = this.gl.getActiveUniform(program, i).name;
            program.uniforms[uniformName] = this.gl.getUniformLocation(program, uniformName);
        }
        
        return program;
    }
    
    setupBuffers() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(0);
    }
    
    initFramebuffers() {
        const simRes = this.getResolution(this.config.SIM_RESOLUTION);
        const dyeRes = this.getResolution(this.config.DYE_RESOLUTION);
        const texType = this.ext.halfFloatTexType;
        const rgba = this.ext.formatRGBA;
        const rg = this.ext.formatRG;
        const r = this.ext.formatR;
        const filtering = this.ext.supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST;
        
        this.gl.disable(this.gl.BLEND);
        
        if (!this.framebuffers.dye) {
            this.framebuffers.dye = this.createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        } else {
            this.framebuffers.dye = this.resizeDoubleFBO(this.framebuffers.dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        }
        
        if (!this.framebuffers.velocity) {
            this.framebuffers.velocity = this.createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        } else {
            this.framebuffers.velocity = this.resizeDoubleFBO(this.framebuffers.velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        }
        
        this.framebuffers.divergence = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
        this.framebuffers.curl = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
        this.framebuffers.pressure = this.createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
    }
    
    createFBO(w, h, internalFormat, format, type, param) {
        this.gl.activeTexture(this.gl.TEXTURE0);
        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, param);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, param);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
        
        const fbo = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        this.gl.viewport(0, 0, w, h);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        
        return {
            texture,
            fbo,
            width: w,
            height: h,
            texelSizeX: 1.0 / w,
            texelSizeY: 1.0 / h,
            attach: (id) => {
                this.gl.activeTexture(this.gl.TEXTURE0 + id);
                this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
                return id;
            }
        };
    }
    
    createDoubleFBO(w, h, internalFormat, format, type, param) {
        let fbo1 = this.createFBO(w, h, internalFormat, format, type, param);
        let fbo2 = this.createFBO(w, h, internalFormat, format, type, param);
        
        return {
            width: w,
            height: h,
            texelSizeX: fbo1.texelSizeX,
            texelSizeY: fbo1.texelSizeY,
            get read() { return fbo1; },
            set read(value) { fbo1 = value; },
            get write() { return fbo2; },
            set write(value) { fbo2 = value; },
            swap() {
                const temp = fbo1;
                fbo1 = fbo2;
                fbo2 = temp;
            }
        };
    }
    
    resizeFBO(target, w, h, internalFormat, format, type, param) {
        const newFBO = this.createFBO(w, h, internalFormat, format, type, param);
        this.gl.useProgram(this.programs.copy);
        this.gl.uniform1i(this.programs.copy.uniforms.uTexture, target.attach(0));
        this.blit(newFBO);
        return newFBO;
    }
    
    resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
        if (target.width === w && target.height === h) return target;
        target.read = this.resizeFBO(target.read, w, h, internalFormat, format, type, param);
        target.write = this.createFBO(w, h, internalFormat, format, type, param);
        target.width = w;
        target.height = h;
        target.texelSizeX = 1.0 / w;
        target.texelSizeY = 1.0 / h;
        return target;
    }
    
    getResolution(resolution) {
        let aspectRatio = this.gl.drawingBufferWidth / this.gl.drawingBufferHeight;
        if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
        
        const min = Math.round(resolution);
        const max = Math.round(resolution * aspectRatio);
        
        if (this.gl.drawingBufferWidth > this.gl.drawingBufferHeight) {
            return { width: max, height: min };
        } else {
            return { width: min, height: max };
        }
    }
    
    blit(target) {
        if (target == null) {
            this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        } else {
            this.gl.viewport(0, 0, target.width, target.height);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, target.fbo);
        }
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    }
    
    setupEventListeners() {
        let isFirstMove = true;
        
        const handleMouseMove = (e) => {
            const pointer = this.pointers[0];
            const posX = this.scaleByPixelRatio(e.clientX);
            const posY = this.scaleByPixelRatio(e.clientY);
            
            if (isFirstMove) {
                this.updatePointerMoveData(pointer, posX, posY, this.generateColor());
                isFirstMove = false;
            } else {
                this.updatePointerMoveData(pointer, posX, posY, pointer.color);
            }
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        
        document.addEventListener('mousedown', (e) => {
            const pointer = this.pointers[0];
            const posX = this.scaleByPixelRatio(e.clientX);
            const posY = this.scaleByPixelRatio(e.clientY);
            this.updatePointerDownData(pointer, -1, posX, posY);
            this.clickSplat(pointer);
        });
        
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const pointer = this.pointers[0];
            const touch = e.touches[0];
            const posX = this.scaleByPixelRatio(touch.clientX);
            const posY = this.scaleByPixelRatio(touch.clientY);
            this.updatePointerMoveData(pointer, posX, posY, pointer.color);
        }, { passive: false });
        
        document.addEventListener('touchstart', (e) => {
            const pointer = this.pointers[0];
            const touch = e.touches[0];
            const posX = this.scaleByPixelRatio(touch.clientX);
            const posY = this.scaleByPixelRatio(touch.clientY);
            this.updatePointerDownData(pointer, touch.identifier, posX, posY);
        });
        
        document.addEventListener('touchend', (e) => {
            const pointer = this.pointers[0];
            pointer.down = false;
        });
    }
    
    scaleByPixelRatio(input) {
        const pixelRatio = window.devicePixelRatio || 1;
        return Math.floor(input * pixelRatio);
    }
    
    updatePointerDownData(pointer, id, posX, posY) {
        pointer.id = id;
        pointer.down = true;
        pointer.moved = false;
        pointer.texcoordX = posX / this.canvas.width;
        pointer.texcoordY = 1.0 - posY / this.canvas.height;
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.deltaX = 0;
        pointer.deltaY = 0;
        pointer.color = this.generateColor();
    }
    
    updatePointerMoveData(pointer, posX, posY, color) {
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.texcoordX = posX / this.canvas.width;
        pointer.texcoordY = 1.0 - posY / this.canvas.height;
        pointer.deltaX = this.correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
        pointer.deltaY = this.correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
        pointer.color = color;
    }
    
    correctDeltaX(delta) {
        const aspectRatio = this.canvas.width / this.canvas.height;
        if (aspectRatio < 1) delta *= aspectRatio;
        return delta;
    }
    
    correctDeltaY(delta) {
        const aspectRatio = this.canvas.width / this.canvas.height;
        if (aspectRatio > 1) delta /= aspectRatio;
        return delta;
    }
    
    generateColor() {
        const c = this.HSVtoRGB(Math.random(), 1.0, 1.0);
        c.r *= 0.15;
        c.g *= 0.15;
        c.b *= 0.15;
        return c;
    }
    
    HSVtoRGB(h, s, v) {
        let r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        
        return { r, g, b };
    }
    
    clickSplat(pointer) {
        const color = this.generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        const dx = 10 * (Math.random() - 0.5);
        const dy = 30 * (Math.random() - 0.5);
        this.splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }
    
    splat(x, y, dx, dy, color) {
        this.gl.useProgram(this.programs.splat);
        this.gl.uniform1i(this.programs.splat.uniforms.uTarget, this.framebuffers.velocity.read.attach(0));
        this.gl.uniform1f(this.programs.splat.uniforms.aspectRatio, this.canvas.width / this.canvas.height);
        this.gl.uniform2f(this.programs.splat.uniforms.point, x, y);
        this.gl.uniform3f(this.programs.splat.uniforms.color, dx, dy, 0.0);
        this.gl.uniform1f(this.programs.splat.uniforms.radius, this.correctRadius(this.config.SPLAT_RADIUS / 100.0));
        this.blit(this.framebuffers.velocity.write);
        this.framebuffers.velocity.swap();
        
        this.gl.uniform1i(this.programs.splat.uniforms.uTarget, this.framebuffers.dye.read.attach(0));
        this.gl.uniform3f(this.programs.splat.uniforms.color, color.r, color.g, color.b);
        this.blit(this.framebuffers.dye.write);
        this.framebuffers.dye.swap();
    }
    
    correctRadius(radius) {
        const aspectRatio = this.canvas.width / this.canvas.height;
        if (aspectRatio > 1) radius *= aspectRatio;
        return radius;
    }
    
    startRenderLoop() {
        const render = () => {
            const dt = this.calcDeltaTime();
            if (this.resizeCanvas()) this.initFramebuffers();
            this.updateColors(dt);
            this.applyInputs();
            this.step(dt);
            this.render(null);
            requestAnimationFrame(render);
        };
        render();
    }
    
    calcDeltaTime() {
        const now = Date.now();
        let dt = (now - this.lastUpdateTime) / 1000;
        dt = Math.min(dt, 0.016666);
        this.lastUpdateTime = now;
        return dt;
    }
    
    resizeCanvas() {
        const width = this.scaleByPixelRatio(this.canvas.clientWidth);
        const height = this.scaleByPixelRatio(this.canvas.clientHeight);
        
        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
            return true;
        }
        return false;
    }
    
    updateColors(dt) {
        this.colorUpdateTimer += dt * this.config.COLOR_UPDATE_SPEED;
        if (this.colorUpdateTimer >= 1) {
            this.colorUpdateTimer = this.wrap(this.colorUpdateTimer, 0, 1);
            this.pointers.forEach(p => {
                p.color = this.generateColor();
            });
        }
    }
    
    wrap(value, min, max) {
        const range = max - min;
        if (range === 0) return min;
        return ((value - min) % range) + min;
    }
    
    applyInputs() {
        this.pointers.forEach(p => {
            if (p.moved) {
                p.moved = false;
                this.splatPointer(p);
            }
        });
    }
    
    splatPointer(pointer) {
        const dx = pointer.deltaX * this.config.SPLAT_FORCE;
        const dy = pointer.deltaY * this.config.SPLAT_FORCE;
        this.splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }
    
    step(dt) {
        this.gl.disable(this.gl.BLEND);
        
        // Curl
        this.gl.useProgram(this.programs.curl);
        this.gl.uniform2f(this.programs.curl.uniforms.texelSize, this.framebuffers.velocity.texelSizeX, this.framebuffers.velocity.texelSizeY);
        this.gl.uniform1i(this.programs.curl.uniforms.uVelocity, this.framebuffers.velocity.read.attach(0));
        this.blit(this.framebuffers.curl);
        
        // Vorticity
        this.gl.useProgram(this.programs.vorticity);
        this.gl.uniform2f(this.programs.vorticity.uniforms.texelSize, this.framebuffers.velocity.texelSizeX, this.framebuffers.velocity.texelSizeY);
        this.gl.uniform1i(this.programs.vorticity.uniforms.uVelocity, this.framebuffers.velocity.read.attach(0));
        this.gl.uniform1i(this.programs.vorticity.uniforms.uCurl, this.framebuffers.curl.attach(1));
        this.gl.uniform1f(this.programs.vorticity.uniforms.curl, this.config.CURL);
        this.gl.uniform1f(this.programs.vorticity.uniforms.dt, dt);
        this.blit(this.framebuffers.velocity.write);
        this.framebuffers.velocity.swap();
        
        // Divergence
        this.gl.useProgram(this.programs.divergence);
        this.gl.uniform2f(this.programs.divergence.uniforms.texelSize, this.framebuffers.velocity.texelSizeX, this.framebuffers.velocity.texelSizeY);
        this.gl.uniform1i(this.programs.divergence.uniforms.uVelocity, this.framebuffers.velocity.read.attach(0));
        this.blit(this.framebuffers.divergence);
        
        // Clear pressure
        this.gl.useProgram(this.programs.clear);
        this.gl.uniform1i(this.programs.clear.uniforms.uTexture, this.framebuffers.pressure.read.attach(0));
        this.gl.uniform1f(this.programs.clear.uniforms.value, this.config.PRESSURE);
        this.blit(this.framebuffers.pressure.write);
        this.framebuffers.pressure.swap();
        
        // Pressure
        this.gl.useProgram(this.programs.pressure);
        this.gl.uniform2f(this.programs.pressure.uniforms.texelSize, this.framebuffers.velocity.texelSizeX, this.framebuffers.velocity.texelSizeY);
        this.gl.uniform1i(this.programs.pressure.uniforms.uDivergence, this.framebuffers.divergence.attach(0));
        for (let i = 0; i < this.config.PRESSURE_ITERATIONS; i++) {
            this.gl.uniform1i(this.programs.pressure.uniforms.uPressure, this.framebuffers.pressure.read.attach(1));
            this.blit(this.framebuffers.pressure.write);
            this.framebuffers.pressure.swap();
        }
        
        // Gradient subtract
        this.gl.useProgram(this.programs.gradientSubtract);
        this.gl.uniform2f(this.programs.gradientSubtract.uniforms.texelSize, this.framebuffers.velocity.texelSizeX, this.framebuffers.velocity.texelSizeY);
        this.gl.uniform1i(this.programs.gradientSubtract.uniforms.uPressure, this.framebuffers.pressure.read.attach(0));
        this.gl.uniform1i(this.programs.gradientSubtract.uniforms.uVelocity, this.framebuffers.velocity.read.attach(1));
        this.blit(this.framebuffers.velocity.write);
        this.framebuffers.velocity.swap();
        
        // Advection
        this.gl.useProgram(this.programs.advection);
        this.gl.uniform2f(this.programs.advection.uniforms.texelSize, this.framebuffers.velocity.texelSizeX, this.framebuffers.velocity.texelSizeY);
        if (!this.ext.supportLinearFiltering) {
            this.gl.uniform2f(this.programs.advection.uniforms.dyeTexelSize, this.framebuffers.velocity.texelSizeX, this.framebuffers.velocity.texelSizeY);
        }
        
        const velocityId = this.framebuffers.velocity.read.attach(0);
        this.gl.uniform1i(this.programs.advection.uniforms.uVelocity, velocityId);
        this.gl.uniform1i(this.programs.advection.uniforms.uSource, velocityId);
        this.gl.uniform1f(this.programs.advection.uniforms.dt, dt);
        this.gl.uniform1f(this.programs.advection.uniforms.dissipation, this.config.VELOCITY_DISSIPATION);
        this.blit(this.framebuffers.velocity.write);
        this.framebuffers.velocity.swap();
        
        if (!this.ext.supportLinearFiltering) {
            this.gl.uniform2f(this.programs.advection.uniforms.dyeTexelSize, this.framebuffers.dye.texelSizeX, this.framebuffers.dye.texelSizeY);
        }
        this.gl.uniform1i(this.programs.advection.uniforms.uVelocity, this.framebuffers.velocity.read.attach(0));
        this.gl.uniform1i(this.programs.advection.uniforms.uSource, this.framebuffers.dye.read.attach(1));
        this.gl.uniform1f(this.programs.advection.uniforms.dissipation, this.config.DENSITY_DISSIPATION);
        this.blit(this.framebuffers.dye.write);
        this.framebuffers.dye.swap();
    }
    
    render(target) {
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);
        this.drawDisplay(target);
    }
    
    drawDisplay(target) {
        const width = target == null ? this.gl.drawingBufferWidth : target.width;
        const height = target == null ? this.gl.drawingBufferHeight : target.height;
        
        this.gl.useProgram(this.programs.display);
        if (this.config.SHADING) {
            this.gl.uniform2f(this.programs.display.uniforms.texelSize, 1.0 / width, 1.0 / height);
        }
        this.gl.uniform1i(this.programs.display.uniforms.uTexture, this.framebuffers.dye.read.attach(0));
        this.blit(target);
    }
    
    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// 3D Cubes Animation Class
class CubesAnimation {
    constructor(config = {}) {
        this.gridSize = config.gridSize || 8;
        this.maxAngle = config.maxAngle || 60;
        this.radius = config.radius || 4;
        this.rippleColor = config.rippleColor || '#ff6b6b';
        this.faceColor = config.faceColor || '#1a1a2e';
        this.rippleSpeed = config.rippleSpeed || 1.5;
        this.autoAnimate = config.autoAnimate !== undefined ? config.autoAnimate : true;
        this.rippleOnClick = config.rippleOnClick !== undefined ? config.rippleOnClick : true;
        
        this.scene = null;
        this.rafId = null;
        this.idleTimer = null;
        this.userActive = false;
        this.simPos = { x: 0, y: 0 };
        this.simTarget = { x: 0, y: 0 };
        this.simRAF = null;
        
        this.init();
    }
    
    init() {
        this.scene = document.getElementById('cubes-scene');
        if (!this.scene) return;
        
        this.createCubes();
        this.setupEventListeners();
        if (this.autoAnimate) {
            this.startAutoAnimation();
        }
    }
    
    createCubes() {
        this.scene.innerHTML = '';
        
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                const cube = document.createElement('div');
                cube.className = 'cube';
                cube.dataset.row = r;
                cube.dataset.col = c;
                
                // 创建立方体的6个面
                const faces = ['top', 'bottom', 'left', 'right', 'front', 'back'];
                faces.forEach(face => {
                    const faceEl = document.createElement('div');
                    faceEl.className = `cube-face cube-face--${face}`;
                    cube.appendChild(faceEl);
                });
                
                this.scene.appendChild(cube);
            }
        }
    }
    
    tiltAt(rowCenter, colCenter) {
        if (!this.scene) return;
        
        this.scene.querySelectorAll('.cube').forEach(cube => {
            const r = parseInt(cube.dataset.row);
            const c = parseInt(cube.dataset.col);
            const dist = Math.hypot(r - rowCenter, c - colCenter);
            
            if (dist <= this.radius) {
                const pct = 1 - dist / this.radius;
                const angle = pct * this.maxAngle;
                
                cube.style.transition = 'transform 0.3s ease-out';
                cube.style.transform = `rotateX(${-angle}deg) rotateY(${angle}deg)`;
            } else {
                cube.style.transition = 'transform 0.6s ease-out';
                cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
            }
        });
    }
    
    onPointerMove(e) {
        this.userActive = true;
        if (this.idleTimer) clearTimeout(this.idleTimer);
        
        const rect = this.scene.getBoundingClientRect();
        const cellW = rect.width / this.gridSize;
        const cellH = rect.height / this.gridSize;
        const colCenter = (e.clientX - rect.left) / cellW;
        const rowCenter = (e.clientY - rect.top) / cellH;
        
        if (this.rafId) cancelAnimationFrame(this.rafId);
        this.rafId = requestAnimationFrame(() => {
            this.tiltAt(rowCenter, colCenter);
        });
        
        this.idleTimer = setTimeout(() => {
            this.userActive = false;
        }, 3000);
    }
    
    resetAll() {
        if (!this.scene) return;
        
        this.scene.querySelectorAll('.cube').forEach(cube => {
            cube.style.transition = 'transform 0.6s ease-out';
            cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }
    
    onClick(e) {
        if (!this.rippleOnClick || !this.scene) return;
        
        const rect = this.scene.getBoundingClientRect();
        const cellW = rect.width / this.gridSize;
        const cellH = rect.height / this.gridSize;
        const colHit = Math.floor((e.clientX - rect.left) / cellW);
        const rowHit = Math.floor((e.clientY - rect.top) / cellH);
        
        const baseRingDelay = 150; // ms
        const baseAnimDur = 300; // ms
        const baseHold = 600; // ms
        
        const spreadDelay = baseRingDelay / this.rippleSpeed;
        const animDuration = baseAnimDur / this.rippleSpeed;
        const holdTime = baseHold / this.rippleSpeed;
        
        const rings = {};
        this.scene.querySelectorAll('.cube').forEach(cube => {
            const r = parseInt(cube.dataset.row);
            const c = parseInt(cube.dataset.col);
            const dist = Math.hypot(r - rowHit, c - colHit);
            const ring = Math.round(dist);
            if (!rings[ring]) rings[ring] = [];
            rings[ring].push(cube);
        });
        
        Object.keys(rings)
            .map(Number)
            .sort((a, b) => a - b)
            .forEach(ring => {
                const delay = ring * spreadDelay;
                const faces = rings[ring].flatMap(cube => 
                    Array.from(cube.querySelectorAll('.cube-face'))
                );
                
                setTimeout(() => {
                    faces.forEach(face => {
                        face.style.transition = `background-color ${animDuration}ms ease-out`;
                        face.style.backgroundColor = this.rippleColor;
                        
                        setTimeout(() => {
                            face.style.backgroundColor = this.faceColor;
                        }, animDuration + holdTime);
                    });
                }, delay);
            });
    }
    
    startAutoAnimation() {
        this.simPos = {
            x: Math.random() * this.gridSize,
            y: Math.random() * this.gridSize
        };
        this.simTarget = {
            x: Math.random() * this.gridSize,
            y: Math.random() * this.gridSize
        };
        
        const speed = 0.02;
        const loop = () => {
            if (!this.userActive) {
                const pos = this.simPos;
                const tgt = this.simTarget;
                
                pos.x += (tgt.x - pos.x) * speed;
                pos.y += (tgt.y - pos.y) * speed;
                
                this.tiltAt(pos.y, pos.x);
                
                if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
                    this.simTarget = {
                        x: Math.random() * this.gridSize,
                        y: Math.random() * this.gridSize
                    };
                }
            }
            this.simRAF = requestAnimationFrame(loop);
        };
        
        this.simRAF = requestAnimationFrame(loop);
    }
    
    setupEventListeners() {
        if (!this.scene) return;
        
        this.scene.addEventListener('pointermove', (e) => this.onPointerMove(e));
        this.scene.addEventListener('pointerleave', () => this.resetAll());
        this.scene.addEventListener('click', (e) => this.onClick(e));
        
        // 鼠标移动事件兼容性
        this.scene.addEventListener('mousemove', (e) => this.onPointerMove(e));
        this.scene.addEventListener('mouseleave', () => this.resetAll());
    }
    
    destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.simRAF) cancelAnimationFrame(this.simRAF);
        if (this.idleTimer) clearTimeout(this.idleTimer);
    }
}

// MagnetLines class
class MagnetLines {
    constructor(config = {}) {
        this.rows = config.rows || 9;
        this.columns = config.columns || 9;
        this.containerSize = config.containerSize || "350px";
        this.lineColor = config.lineColor || "#ff6347";
        this.lineWidth = config.lineWidth || "3px";
        this.lineHeight = config.lineHeight || "20px";
        this.baseAngle = config.baseAngle || 0;
        this.container = null;
        this.items = [];
        
        this.onPointerMove = this.onPointerMove.bind(this);
    }
    
    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.createLines();
        this.setupEventListeners();
        
        // Initialize with middle position
        setTimeout(() => {
            if (this.items.length) {
                const middleIndex = Math.floor(this.items.length / 2);
                const rect = this.items[middleIndex].getBoundingClientRect();
                this.onPointerMove({ clientX: rect.x, clientY: rect.y });
            }
        }, 100);
    }
    
    createLines() {
        const total = this.rows * this.columns;
        this.container.innerHTML = '';
        
        for (let i = 0; i < total; i++) {
            const span = document.createElement('span');
            span.style.setProperty('--rotate', `${this.baseAngle}deg`);
            span.style.backgroundColor = this.lineColor;
            span.style.width = this.lineWidth;
            span.style.height = this.lineHeight;
            
            this.container.appendChild(span);
            this.items.push(span);
        }
    }
    
    onPointerMove(e) {
        this.items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;

            const b = e.clientX - centerX;
            const a = e.clientY - centerY;
            const c = Math.sqrt(a * a + b * b) || 1;
            const r = (Math.acos(b / c) * 180) / Math.PI * (e.clientY > centerY ? 1 : -1);

            item.style.setProperty("--rotate", `${r}deg`);
        });
    }
    
    setupEventListeners() {
        window.addEventListener("pointermove", this.onPointerMove);
    }
    
    destroy() {
        if (this.container) {
            window.removeEventListener("pointermove", this.onPointerMove);
            this.container.innerHTML = '';
        }
    }
}

// Grad class for noise generation
class Grad {
    constructor(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }
    dot2(x, y) { return this.x * x + this.y * y; }
}

// Noise class for wave generation
class Noise {
    constructor(seed = 0) {
        this.grad3 = [
            new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
            new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
            new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)
        ];
        this.p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
            69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
            203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74,
            165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
            92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208,
            89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
            226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17,
            182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167,
            43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246,
            97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239,
            107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
            138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
        ];
        this.perm = new Array(512);
        this.gradP = new Array(512);
        this.seed(seed);
    }
    
    seed(seed) {
        if (seed > 0 && seed < 1) seed *= 65536;
        seed = Math.floor(seed);
        if (seed < 256) seed |= seed << 8;
        for (let i = 0; i < 256; i++) {
            let v = (i & 1) ? (this.p[i] ^ (seed & 255)) : (this.p[i] ^ ((seed >> 8) & 255));
            this.perm[i] = this.perm[i + 256] = v;
            this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
        }
    }
    
    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(a, b, t) { return (1 - t) * a + t * b; }
    
    perlin2(x, y) {
        let X = Math.floor(x), Y = Math.floor(y);
        x -= X; y -= Y; X &= 255; Y &= 255;
        const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
        const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
        const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
        const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
        const u = this.fade(x);
        return this.lerp(
            this.lerp(n00, n10, u),
            this.lerp(n01, n11, u),
            this.fade(y)
        );
    }
}

// Waves class
class Waves {
    constructor(config = {}) {
        this.lineColor = config.lineColor || "#fff";
        this.backgroundColor = config.backgroundColor || "rgba(255, 255, 255, 0.2)";
        this.waveSpeedX = config.waveSpeedX || 0.02;
        this.waveSpeedY = config.waveSpeedY || 0.01;
        this.waveAmpX = config.waveAmpX || 40;
        this.waveAmpY = config.waveAmpY || 20;
        this.friction = config.friction || 0.9;
        this.tension = config.tension || 0.01;
        this.maxCursorMove = config.maxCursorMove || 120;
        this.xGap = config.xGap || 12;
        this.yGap = config.yGap || 36;
        
        this.container = null;
        this.canvas = null;
        this.ctx = null;
        this.bounding = { width: 0, height: 0, left: 0, top: 0 };
        this.noise = new Noise(Math.random());
        this.lines = [];
        this.mouse = {
            x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false
        };
        this.frameId = null;
        
        this.onResize = this.onResize.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.tick = this.tick.bind(this);
    }
    
    init(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = this.container.querySelector('canvas');
        if (!this.container || !this.canvas) return;
        
        this.ctx = this.canvas.getContext("2d");
        this.setSize();
        this.setLines();
        this.setupEventListeners();
        this.frameId = requestAnimationFrame(this.tick);
    }
    
    setSize() {
        this.bounding = this.container.getBoundingClientRect();
        this.canvas.width = this.bounding.width;
        this.canvas.height = this.bounding.height;
    }
    
    setLines() {
        const { width, height } = this.bounding;
        this.lines = [];
        const oWidth = width + 200, oHeight = height + 30;
        const totalLines = Math.ceil(oWidth / this.xGap);
        const totalPoints = Math.ceil(oHeight / this.yGap);
        const xStart = (width - this.xGap * totalLines) / 2;
        const yStart = (height - this.yGap * totalPoints) / 2;
        
        for (let i = 0; i <= totalLines; i++) {
            const pts = [];
            for (let j = 0; j <= totalPoints; j++) {
                pts.push({
                    x: xStart + this.xGap * i,
                    y: yStart + this.yGap * j,
                    wave: { x: 0, y: 0 },
                    cursor: { x: 0, y: 0, vx: 0, vy: 0 }
                });
            }
            this.lines.push(pts);
        }
    }
    
    movePoints(time) {
        this.lines.forEach((pts) => {
            pts.forEach((p) => {
                const move = this.noise.perlin2(
                    (p.x + time * this.waveSpeedX) * 0.002,
                    (p.y + time * this.waveSpeedY) * 0.0015
                ) * 12;
                p.wave.x = Math.cos(move) * this.waveAmpX;
                p.wave.y = Math.sin(move) * this.waveAmpY;

                const dx = p.x - this.mouse.sx, dy = p.y - this.mouse.sy;
                const dist = Math.hypot(dx, dy), l = Math.max(175, this.mouse.vs);
                if (dist < l) {
                    const s = 1 - dist / l;
                    const f = Math.cos(dist * 0.001) * s;
                    p.cursor.vx += Math.cos(this.mouse.a) * f * l * this.mouse.vs * 0.00065;
                    p.cursor.vy += Math.sin(this.mouse.a) * f * l * this.mouse.vs * 0.00065;
                }

                p.cursor.vx += (0 - p.cursor.x) * this.tension;
                p.cursor.vy += (0 - p.cursor.y) * this.tension;
                p.cursor.vx *= this.friction;
                p.cursor.vy *= this.friction;
                p.cursor.x += p.cursor.vx * 2;
                p.cursor.y += p.cursor.vy * 2;
                p.cursor.x = Math.min(this.maxCursorMove, Math.max(-this.maxCursorMove, p.cursor.x));
                p.cursor.y = Math.min(this.maxCursorMove, Math.max(-this.maxCursorMove, p.cursor.y));
            });
        });
    }
    
    moved(point, withCursor = true) {
        const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
        const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
        return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    }
    
    drawLines() {
        const { width, height } = this.bounding;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.lineColor;
        this.lines.forEach((points) => {
            let p1 = this.moved(points[0], false);
            this.ctx.moveTo(p1.x, p1.y);
            points.forEach((p, idx) => {
                const isLast = idx === points.length - 1;
                p1 = this.moved(p, !isLast);
                const p2 = this.moved(points[idx + 1] || points[points.length - 1], !isLast);
                this.ctx.lineTo(p1.x, p1.y);
                if (isLast) this.ctx.moveTo(p2.x, p2.y);
            });
        });
        this.ctx.stroke();
    }
    
    tick(t) {
        const mouse = this.mouse;
        mouse.sx += (mouse.x - mouse.sx) * 0.1;
        mouse.sy += (mouse.y - mouse.sy) * 0.1;
        const dx = mouse.x - mouse.lx, dy = mouse.y - mouse.ly;
        const d = Math.hypot(dx, dy);
        mouse.v = d;
        mouse.vs += (d - mouse.vs) * 0.1;
        mouse.vs = Math.min(100, mouse.vs);
        mouse.lx = mouse.x; mouse.ly = mouse.y;
        mouse.a = Math.atan2(dy, dx);

        this.movePoints(t);
        this.drawLines();
        this.frameId = requestAnimationFrame(this.tick);
    }
    
    onResize() {
        this.setSize();
        this.setLines();
    }
    
    onMouseMove(e) {
        this.updateMouse(e.clientX, e.clientY);
    }
    
    updateMouse(x, y) {
        const mouse = this.mouse, b = this.bounding;
        mouse.x = x - b.left;
        mouse.y = y - b.top;
        if (!mouse.set) {
            mouse.sx = mouse.x; mouse.sy = mouse.y;
            mouse.lx = mouse.x; mouse.ly = mouse.y;
            mouse.set = true;
        }
    }
    
    setupEventListeners() {
        window.addEventListener("resize", this.onResize);
        window.addEventListener("mousemove", this.onMouseMove);
    }
    
    destroy() {
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener("mousemove", this.onMouseMove);
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    }
}

// Initialize fluid effect and cubes animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure other scripts are loaded
    setTimeout(() => {
        window.fluidEffect = new FluidEffect();
        console.log('Fluid effect created');
        
        // Initialize 3D cubes animation
        window.cubesAnimation = new CubesAnimation({
            gridSize: 8,
            maxAngle: 60,
            radius: 4,
            rippleColor: '#ff6b6b',
            faceColor: '#1a1a2e',
            rippleSpeed: 1.5,
            autoAnimate: true,
            rippleOnClick: true
        });
        console.log('Cubes animation created');
        
        // Initialize MagnetLines
        window.magnetLines = new MagnetLines({
            rows: 12,
            columns: 12,
            containerSize: "420px",
            lineColor: "white",
            lineWidth: "3px",
            lineHeight: "20px",
            baseAngle: 0
        });
        window.magnetLines.init('magnetLinesContainer');
        console.log('MagnetLines created');
        
        // Initialize Waves
        window.waves = new Waves({
            lineColor: "#2563eb",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            waveSpeedX: 0.02,
            waveSpeedY: 0.01,
            waveAmpX: 40,
            waveAmpY: 20,
            friction: 0.9,
            tension: 0.01,
            maxCursorMove: 120,
            xGap: 12,
            yGap: 36
        });
        window.waves.init('wavesContainer');
        console.log('Waves created');
    }, 100);
}); 