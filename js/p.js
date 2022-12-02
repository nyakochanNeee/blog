    // 定义粒子最大生命周期
    const MAX_PERIOD = 20

    // 获取随机颜色函数，返回值 ： 0-255,0-255,0-255
    function getRandColor() {
        return Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256);
    }
    // 鼠标移动事件处理
    window.onmousemove = function (e) {
        // 生成粒子
        var particle = document.createElement('div')
        //设置类名，使用 css，设置默认样式 
        particle.className = 'particleOwO'
        // 将粒子的 left top 偏移，设置为鼠标移动的位置
        particle.style.left =e.clientX + 'px'
        particle.style.top = e.clientY + 'px'
        // 获取随机颜色值 xx,xx,xx
        var tempColor = getRandColor()
        // 设置为 bgcolor 属性
        particle.setAttribute('bgcolor', tempColor)
        // 生成粒子水平和垂直方向的随机移动速度
        var speedX = Math.random() * 1.5
        var speedY = Math.random() * 0.75 * 1.5
        // 生成随机数
        var randDirectionValue = Math.random()
        // 随机改变粒子在垂直方向的移动方向，向上 或者 向下
        speedY = randDirectionValue > 0.1 ? speedY : -speedY
        // 为该粒子设置X，Y轴移动速度，和生命周期
        particle.setAttribute('speedX', speedX)
        particle.setAttribute('speedY', speedY)
        particle.setAttribute('period', 0)
        // 添加到网页当中
        document.body.appendChild(particle)
    }

    // 运动函数
    function run() {
        // 获取所有的粒子
        var particles = document.getElementsByClassName('particleOwO')

        // 开始遍历
        for (var i = 0; i < particles.length; i++) {
            // 获取粒子的水平、垂直方向的运动速度
            var speedX = particles[i].getAttribute('speedX')
            var speedY = particles[i].getAttribute('speedY')
            // 获取粒子的颜色值
            var color = particles[i].getAttribute('bgcolor')
            // 获取粒子的当前的生命值
            var period = parseInt(particles[i].getAttribute('period'))
            // 增加生命值
            period += 5;
            // 将当前生命值重新设置给该粒子
            particles[i].setAttribute('period', period)
            // 修改粒子的left 和 top 实现移动效果，（先获取粒子当前的偏移量，然后加上移动速度）
            particles[i].style.top = parseFloat(particles[i].style.top) + parseFloat(speedY) + 'px'
            // 让粒子的颜色跟随，生命值而变化：使用 rgba 改变颜色的透明度
            particles[i].style.backgroundColor = 'rgba(' + color + ',' + (1 - period / 100) + ')';

            // 如果该粒子生命值超过的定义的最大生命周期，则销毁该粒子
            if (period >= MAX_PERIOD) {
                document.body.removeChild(particles[i])
            }
        }
    }
		// 使用定时器运行运动函数
    setInterval(run, 0.1)