import './style.scss'
import $ from 'jquery'

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

/*
  scrollTo(element.scrollTop || 200, 400)
*/
function scrollTo (to, duration) {
  const element = document.scrollingElement
  const start = (element && element.scrollTop) || window.pageYOffset,
    change = to - start,
    increment = 20
  let currentTime = 0

  const animateScroll = function () {
    currentTime += increment
    const val = Math.easeInOutQuad(currentTime, start, change, duration)
    window.scrollTo(0, val)
    if (currentTime < duration) {
      window.setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

function buttonToggle () {
  var OffsetTop = 0;
  $('.btn-more').toggle(
    function () {
      $(this).parent().attr('data-toggle', 1)
      OffsetTop = $(document).scrollTop()
    }, function () {
      $(this).parent().attr('data-toggle', 0)
      scrollTo(OffsetTop || 200, 100)
    })
}

function seeMoreChekcHeight () {
  $('.seemore').each(function () {
    const button = $(this).find('.btn-more')
    let elMaxHeight = $(this).find('.max-height')
    let maxHeight = elMaxHeight.css('max-height').replace('px', '')
    let height = $(this).find('.full-text').height()

    if (height > maxHeight) {
      button.show()
      elMaxHeight.css('max-height', maxHeight)
    } else {
      button.hide()
      elMaxHeight.css('max-height','initial')
    }
  })
}

window.addEventListener('load', function () {
  seeMoreChekcHeight()
  buttonToggle()
})

window.addEventListener('resize', seeMoreChekcHeight)

export { seeMoreChekcHeight, buttonToggle }

