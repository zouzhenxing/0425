'use strict';

var template = `<section>
    {{ name }}
</section>`;

var epayconent = Vue.extend({
    template : template,
    props : {
        name : {
            type : String
        }
    }
});

module.exports = epayconent;