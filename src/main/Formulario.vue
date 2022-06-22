<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>

  <form
    @submit.prevent="confirm1(!v$.$invalid)"
    class="flex flex-wrap align-items-center justify-content-center"
  >
    <Card class="m-8 lg-12 xl-12 bg-bluegray-200 opacity-90">
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
                v-model="v$.nomedoProduto.$model"
                placeholder="Nome do produto"
              />
            </div>
          </div>
          <div class="md:col-6 lg:col-6 xl:col-6 col-12">
            <div class="field">
              <InputText
                id="InputText"
                v-model="v$.codigodoProduto"
                placeholder="Codigo do Produto"
              />
            </div>
          </div>
          <div class="md:col-6 lg:col-6 xl:col-6 col-12">
            <div class="field">
              <h5>Descrição do Produto</h5>
              <Textarea v-model="descricaodoProduto" rows="5" cols="30" />
            </div>
          </div>
          <div class="md:col-6 lg:col-6 grid p-fluid">
            <div class="field">
              <label for="integeronly">Preço</label>
              <InputNumber
                id="integeronly-us"
                v-model="preco"
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                placeholder="Preço do Produto"
              />
            </div>
          </div>
          <div class="md:col-6 lg:col-6 xl:col-6 col-12">
            <div class="field">
              <p>Data da coleta</p>
              <Calendar
                v-model="data"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                showIcon="true"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="card">
          <Button
            @click="confirm1()"
            icon="pi pi-check"
            label="Salvar"
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
      nomedoProduto: "",
      codigodoProduto: "",
      descricaodoProduto: "",
      preco: '',

      data: null,
      submitted: false,
      

      
    };
  },
  validations() {
    return {
      nomedoProduto: { required },
      codigodoProduto: { required },
      descricaodoProduto: { required },
      preco: { required },
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
          summary: "Confirmado a data da coleta",
          detail: "O dia da coleta, foi foi agendada!",
          life: 3000,
        });
        this.resetar();
      }
    },
    confirm2() {
      this.$confirm.require({
        message: "Você deseja excluir, os arquivos gravados até agora?",
        header: "opção de excluir",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          this.resetar();
          this.$toast.add({
            severity: "info",
            summary: "Você confirmou para excluir os dados gravados!",
            detail: "Excluindo os dados gravados",
            life: 3000,
          });
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Cancelar a exclusão de dados",
            detail: "Você cancelou a operação de exclusão de dados",
            life: 3000,
          });
        },
      });
    },
    resetar() {
      this.nomedoproduto = null;
      this.codigodoProduto = null;
      this.descricaodoProduto = null;
      this.preco = null;
      this.data = null;
    },
  },
  //fim dos metodos
};
</script>

<style>
</style>