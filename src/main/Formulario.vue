<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>

  <form
    @submit.prevent="confirm1(!v$.$invalid)"
    class="flex align-items-center justify-content-center"
  >
    <Card style="width: 100rem; margin-bottom: 2em">
      <template #title>
        <h2 class="text-center">
          Formulário de Aquisação de novos equipamentos da SESPA
        </h2>
      </template>
      <template #content>
        <div class="grid p-fluid col-12">
          <div class="field col-12 md:col-4">
            <InputText
              id="inputtext"
              v-model="v$.name.$model"
              :class="{ 'p-invalid': v$.name.$invalid && submitted }"
              placeholder="Nome do produto"
            />
            <span v-if="v$.name.$error || v$.name.$pending">
              Este Campo é requerido.</span
            >
          </div>

          <div class="field col-12 md:col-4">
            <InputText
              id="InputText"
              v-model="v$.code.$model"
              :class="{ 'p-invalid': v$.code.$invalid && submitted }"
              placeholder="Codigo do Produto"
            />
            <span v-if="v$.code.$error || v$.code.$pending">
              Este Campo é requerido.</span
            >
          </div>
          <div class="field col-12 md:col-4">
            <Dropdown
              v-model="v$.choosecategory.$model"
              :class="{ 'p-invalid': v$.code.$invalid && submitted }"
              :options="category"
              optionLabel="name"
              placeholder=" Escolha a categoria desejada"
            />
            <span v-if="v$.choosecategory.$error || v$.choosecategory.$pending">
              Este Campo é requerido.</span
            >
          </div>
        </div>

        <div class="grid p-fluid col-12">
          <div class="field col-12 md:col-4">
            <label for="descricaodoProduto">Descrição do Produto</label>
            <Textarea
              v-model="v$.description.$model"
              :class="{ 'p-invalid': v$.description.$invalid && submitted }"
              rows="1"
              cols="30"
            />
            <span v-if="v$.description.$error || v$.description.$pending">
              Este Campo é requerido.</span
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="price">Preço</label>
            <InputNumber
              id="price"
              v-model="v$.price.$model"
              :class="{ 'p-invalid': v$.price.$invalid && submitted }"
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              placeholder="Preço do Produto"
            />
            <span v-if="v$.price.$error || v$.price.$pending">
              Este Campo é requerido.</span
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="minmax-buttons">Quantidade</label>
            <InputNumber
              id="quantidade"
              v-model="v$.quantity.$model"
              :class="{ 'p-invalid': v$.quantity.$invalid && submitted }"
              showButtons
              :min="0"
              :max="25"
            />
            <span v-if="v$.quantity.$error || v$.quantity.$pending">
              Este Campo é requerido.</span
            >
          </div>
        </div>

        <div class="grid p-fluid col-12">
          <div class="field col-12 md:col-4">
            <Dropdown
              v-model="v$.selectionInventory.$model"
              :class="{ 'p-invalid': v$.selectionInventory.$invalid && submitted }"
              :options="inventory"
              optionLabel="name"
              placeholder="Selecionar o objeto que você deseja"
            />
            <span
              v-if="
                v$.selectionInventory.$error || v$.selectionInventory.$pending
              "
            >
              Este Campo é requerido.</span
            >
          </div>
          <div class="field col-12 md:col-8">
            <div>
              <h4>Avalie o seu pedido</h4>
              <rating
                v-model="v$.rating.$model"
                :class="{ 'p-invalid': v$.rating.$invalid && submitted }"
              />
              <span v-if="v$.rating.$error || v$.rating.$pending">
                Este Campo é requerido.</span
              >
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="card">
          <Button
            @click="confirm1()"
            icon="pi pi-check"
            label="Enviar"
            class="mr-2"
          ></Button>
          <Button
            @click="confirm2()"
            icon="pi pi-times"
            label="Cancelar"
            class="mr-2"
          ></Button>
        </div>
      </template>
    </Card>
  </form>
</template>


<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      id: null,
      name: null,
      code: null,
      description: null,
      price: null,
      choosecategory: null,
      quantity: null,
      rating: null,
      selectionInventory: null,

      submitted: false,

      category: [
        { name: "Desktop" },
        { name: "Monitor" },
        { name: "Teclado" },
        { name: "Mouse" },
        { name: "No-break" },
      ],

      inventory: [
        { name: "Em estoque" },
        { name: "Fora de estoque" },
        { name: "Em alta" },
      ],
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(255) },
      code: { required, minLength: minLength(5), maxLength: maxLength(10) },
      description: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255),
      },
      price: { required },
      choosecategory: { required },
      quantity: { required },
      rating: { required },
      selectionInventory: { required },
    };
  },
  methods: {
    confirm1(isValid) {
      this.submitted = true;
      if (!isValid) {
        this.$toast.add({
          severity: "error",
          summary: "Sua Socilitação foi cancelada",
          detail: "Preencha os campos obrigatórios, por favor!",
          life: 3000,
        });
      } else {
        this.$toast.add({
          severity: "info",
          summary: "o seu pedido foi enviado, e iremos analisar o seu pedido",
          detail: "Iremos Analisar o seu pedido.",
          life: 3000,
        });
        this.resetar();
      }
    },
    confirm2() {
      this.$confirm.require({
        message: "Você deseja cancelar o seu pedido?",
        header: "Cancelamento de pedido",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          this.resetar();
          this.$toast.add({
            severity: "info",
            summary: "Você confirmou o cancelamento de pedido",
            detail: "Cancelando o seu pedido e excluindo os dados gravados",
            life: 3000,
          });
          this.resetar();
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Cancelar a exclusão de dados",
            detail: "Voltando para formulario",
            life: 3000,
          });
        },
      });
    },
    resetar() {
      this.name = null;
      this.code = null;
      this.description = null;
      this.price = null;
      this.choosecategory = null;
      this.quantity = null;
      this.rating = null;
      this.selectionInventory = null;
    },
  },
  //fim dos metodos
};
</script>

<style>
</style>