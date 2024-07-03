<template>
    <Form class="row d-flex gy-2" @submit="handleSubmit">
        <div
            v-for="{as, name, label, children, options, ...attrs} in schema.fields" 
            :key="name"
            v-bind="attrs"
            >
            <label :for="name" class="form-label">{{ label }}</label>
            <Field :as="as" :id="name" :name="name" v-bind="attrs" class="form-control">
                <template v-if="as === 'select' && options && options.length">
                    <option v-for="{ value, text } in options" :key="value" :value="value">
                        {{ text }}
                    </option>
                </template>
                <template v-else-if="children && children.length">
                    <component v-for="({tag, text, ...childAttrs}, index) in children"
                        :key="index"
                        :is="tag"
                        v-bind="childAttrs">
                        {{ text }}
                    </component>
                </template>
            </Field>
            <ErrorMessage :name="name"/>
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-outline-success">{{ titleBtn }}</button>
        </div>
    </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    schema: {
        type: Object,
        required: true
    },
    titleBtn: {
        type: String,
        default: 'Crear'
    }
});

const emits = defineEmits(['valuesForm']);

const handleSubmit = (values) => {
    emits('valuesForm', values);
}
</script>