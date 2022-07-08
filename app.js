window.addEventListener('DOMContentLoaded', (event) => {
    /* Get all slides and images */
    const allSlides = document.querySelectorAll('.slide')
    const allslideImages = document.querySelectorAll('.slide-image')

    /* scroll vars */
    let ticking = false

    function updateElStyle(el, imageSize, imagePositionFromBorder) {
        el.style.width = `${imageSize}%`
        el.style.height = `${imageSize}%`
        el.style.top = `${imagePositionFromBorder}%`
        el.style.left = `${imagePositionFromBorder}%`
    }

    /* animate images */
    function imageCarrousel() {
        const imageWrapper = document.querySelector('.image-wrapper')
        const slidesWrapper = document.querySelector('.slides-wrapper')
        const lastElHeight = allSlides[allSlides.length - 1].getBoundingClientRect().height
        if(window.innerWidth < 768) {
            imageWrapper.style.marginBottom = `${lastElHeight}px`
            slidesWrapper.style.marginTop = `-${lastElHeight}px`
        } else {
            imageWrapper.style.marginBottom = '0px'
            slidesWrapper.style.marginTop = '0px'
        }
        for(let i = 0; i < allSlides.length; i++) {
            /* Get slide boundries and calculate size and position image */
            const el = allSlides[i].getBoundingClientRect()
            let imageSize = Math.round((window.innerHeight - el.top)/el.height * 100)
            console.log(`el-${i}: ${imageSize}`)
            let imagePositionFromBorder = (100 - imageSize) / 2

            if (imageSize >= 0) {
                /* Don't scale the first image smaller than 100% and last image more than 100% */
                if(i === 0 && imageSize < 100) {
                    imageSize = 100
                    imagePositionFromBorder = 0
                } else if(i === allSlides.length - 1 && imageSize > 100) {
                    imageSize = 100
                    imagePositionFromBorder = 0
                }
            } else {
                /* If the image size is negative => reset values */
                imageSize = 0
                imagePositionFromBorder = 50
            }

            /* Apply new styles to images */
            updateElStyle(allslideImages[i], imageSize, imagePositionFromBorder)
        }
    }

    /* Add scroll event handler */
    document.addEventListener('scroll', function(e) {

        if (!ticking) {
            window.requestAnimationFrame(function() {
                imageCarrousel()
                ticking = false
            })

            ticking = true
        }
    })
})