<template>
  <section id="depoimentos">
  
    <div class="testimonials">
      <div class="testimonial" v-for="(testimonial, index) in testimonials" :key="index">
        <p>"{{ testimonial.text }}"</p>
        <h4>- {{ testimonial.author }}</h4>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Testimonials',
  data() {
    return {
      testimonials: [
       
      ],
    };
  },
};
</script>

<style scoped>
.testimonials {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.testimonial {
  max-width: 500px;
  margin: 20px 0;
  font-style: italic;
}

h4 {
  margin-top: 10px;
}
</style>
