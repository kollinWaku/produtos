import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import SelectButton from 'primevue/selectbutton';
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmDialog from 'primevue/confirmdialog';
import Message from 'primevue/message';
import DataTable from 'primevue/datatable';
import Textarea from 'primevue/textarea';
import Rating from 'primevue/rating';
import FileUpload from 'primevue/fileupload';


import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import ConfirmationService from 'primevue/confirmationservice';
import InputNumber from 'primevue/inputnumber';


import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'

import '/node_modules/primeflex/primeflex.css'

const app = createApp(App);

app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

app.component('App', App);
app.component('Panel', Panel);
app.component('InputText', InputText);
app.component('InputMask', InputMask);
app.component('SelectButton', SelectButton);
app.component('RadioButton', RadioButton);
app.component('Card', Card);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Button', Button);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('Dialog', Dialog);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('DataTable', DataTable);
app.component('InputNumber', InputNumber);
app.component('Textarea', Textarea);
app.component('Rating', Rating);
app.component('FileUpload', FileUpload);

app.mount('#app')
