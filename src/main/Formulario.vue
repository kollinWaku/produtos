<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>

  <form
    @submit.prevent="confirm1(!v$.$invalid)"
    class="flex align-items-center justify-content-center"
  >
    <Card class="m-10 lg-12 x1-10 bg-bluegray-200 opacity-90">
      <template #title>
        <h2 class="text-center">
          Formulário de Aquisação de novos equipamentos da SESPA
        </h2>
      </template>
      >
      <template #content>
        <div class="grid p-fluid">
          <div class="col-6 md:col-6 lg:col-6 xl:col-6">
            <div class="field">
              <InputText
                id="inputtext"
                v-model="name"
                placeholder="Nome do produto"
              />
            </div>
          </div>
          <div class="md:col-6 lg:col-6 xl:col-6 col-12">
            <div class="field">
              <InputText
                id="InputText"
                v-model="code"
                placeholder="Codigo do Produto"
              />
            </div>
          </div>
          <div class="md:col-6 lg:-6 col-6">
            <div class="field">
              <label for="descricaodoProduto">Descrição do Produto</label>
              <Textarea
                v-model="description"
                rows="5"
                cols="30"
              />
            </div>
          </div>
          <div class="md:col-6 lg:col-6 grid p-fluid">
            <div class="field">
              <label for="price">Preço</label>
              <InputNumber
                id="price"
                v-model="price"
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                placeholder="Preço do Produto"
              />
            </div>
          </div>
          <div class="md:col-6 lg:col-6 xl:col-6 col-12">
            <div class="field">
              <Dropdown
                v-model="choosecategory"
                :options="category"
                optionLabel="name"
                placeholder=" Escolha a categoria desejada"
              />
            </div>
          </div>
          <div class="field col-6 md:col-6">
            <label for="minmax-buttons">Quantidade</label>
            <InputNumber
              id="quantidade"
              v-model="v$.quantidade.$model"
              showButtons
              :min="0"
              :max="25"
            />
          </div>
          <div>
            <h5>Avalie o nosso site!</h5>
            <Rating v-model="Rating" />
          </div>
          <div class="field col-6 md:col-6">
            <Dropdown
              v-model="selectionInventory"
              :options="Inventory"
              optionLabel="name"
              placeholder="Selecionar o objeto que você deseja"
            />
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
import { required } from "@vuelidate/validators";

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
      quantity: null,
      rating: null,
      selectionInventory: null,

      submitted: false,

      choosecategory: null,

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
      name: { required },
      code: { required },
      description: { required },
      preco: { required },
      escolherCategoria: { required },
      quantidade: { required },
      avalicao: { required },
      selecionarInventario: { required },
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