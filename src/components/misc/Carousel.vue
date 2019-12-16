<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        img-height="480px"
        img-src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2michaels-ed-alist-1558392597.jpg?crop=1.00xw:0.753xh;0.00170xw,0.0969xh&resize=480:*"
      ></b-carousel-slide>
      <b-carousel-slide
        img-height="480px"
        img-src="https://stratadam.blob.core.windows.net/strata-web/strata/media/website-content/magazine/issue%203/interior-trends-2019-inner.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-height="480px"
        img-src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2michaels-ed-alist-1558392597.jpg?crop=1.00xw:0.753xh;0.00170xw,0.0969xh&resize=480:*"
      ></b-carousel-slide>
      <b-carousel-slide
        img-height="480px"
        img-src="https://stratadam.blob.core.windows.net/strata-web/strata/media/website-content/magazine/issue%203/interior-trends-2019-inner.jpg"
      ></b-carousel-slide>
    </b-carousel>
    <hr />
    <JumboTron />
  </div>
</template>

<script>
import JumboTron from '@/components/misc/Jumbotron'

export default {
  components: { JumboTron },
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    }
  }
}
</script>
