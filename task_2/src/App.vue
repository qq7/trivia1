<template>
  <div id="app">
    <h5>Question №{{question.id}}</h5>
    <h6>Category: {{question.category.title}}</h6>
    <p>{{question.question}}</p>
    <div>
      <mdl-button class="correct" colored raised v-if="correct === true" @click.native="skip_question">Next question</mdl-button>
      <mdl-button colored raised v-else-if="correct === false" @click.native="skip_question">Skip question</mdl-button>
    </div>
    <p>total questions: {{total}}</p>
    <p>correct answers: {{answers}}</p>
    <mdl-button class="answer shuffled" raised v-for="(letter, index) in shuffled" @click.native="add_letter(letter, index)">{{letter}}</mdl-button>
    <div>
    <mdl-button raised class="answer chosen" v-for="(choose, index) in chosen" @click.native="remove_letter(choose, index)">{{choose}}</mdl-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'app',
        props: {
        },
        data() {
            return {
                question: '',
                total: 0,
                answers: 0,
                chosen: [],
                split_letter: [],
                shuffled: [],
                correct: false,

            };
        },
        methods: {
            skip_question() {
                this.$http.get('http://jservice.io/api/random').then((response) => {
                    this.question = response.data[0];
                    this.total += 1;
                    this.chosen = [];
                    this.split_letter = response.data[0].answer.split('');
                    this.shuffled = this.shuffle(this.split_letter);
                    console.log(response.data[0].answer);
                });
            },
            add_letter(letter, index) {
                this.chosen.push(letter);
                this.shuffled.splice(index, 1);
            },
            remove_letter(choose, index) {
                this.chosen.splice(index, 1);
                this.shuffled.push(choose);
            },
            shuffle(array) {
                let currentIndex = array.length;
                let temporaryValue;
                let randomIndex;
              /* eslint-disable */
                while (currentIndex !== 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
              /* eslint-enable */


                return array;
            },
        },
        created() {
            this.skip_question();
        },
        computed: {
            correct() {
                if (this.chosen.join('') === this.question.answer) {
                    this.answers += 1;
                    return true;
                }
                return false;
            },
        },

    };
</script>
<style src="../node_modules/material-design-lite/material.css" strict></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.answer {
  margin-left: 10px;
  margin-top: 10px;
}

.chosen {
  background-color: rgba(120,214,120, 0.20);
}

.correct {
  margin-left: 150px;
  margin-bottom: 10px;
}
</style>
