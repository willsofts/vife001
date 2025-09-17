<template>
  <DialogForm ref="dialogFormConnection" id="modaldialog_layer_connection" sizing="modal-xm">
    <template v-slot:header>
      <h4 class="modal-title" v-if="insertMode">{{ labels.title_new_connection }}</h4>
      <h4 class="modal-title" v-if="updateMode">{{ labels.title_edit_connection }}</h4>
    </template>
    <template v-slot:default>
        <div class="row row-height">
          <div class="col-height col-md-7">
            <label for="dialogconnectid">{{ labels.connectid_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.connectid.$error}">
              <input ref="connectid" type="text" v-model="localData.connectid" id="dialogconnectid" class="form-control input-md" maxlength="50" readonly />
              <label class="required">*</label>
            </div>
            <span v-if="v$.connectid.$error" class="has-error">{{ v$.connectid.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-12">
            <label for="connectname">{{ labels.connectname_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.connectname.$error}">
              <input ref="connectname" type="text" v-model="localData.connectname" id="connectname" class="form-control input-md" maxlength="150" /> 
              <label class="required">*</label>
            </div>
            <span v-if="v$.connectname.$error" class="has-error">{{ v$.connectname.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-4">
            <label for="connecttype">{{ labels.connecttype_label }}</label>
            <div class="input-group" :class="{'has-error': v$.connecttype.$error}">
              <select ref="connecttype" v-model="localData.connecttype" class="form-control input-md">
                <option v-for="(value,key) in dataCategory.tconnecttype" :key="key" :value="key">{{value}}</option>
              </select>
              <label class="required">*</label>
            </div>
            <span v-if="v$.connecttype.$error" class="has-error">{{ v$.connecttype.$errors[0].$message }}</span>
          </div>
          <div class="col-height col-md-4">
            <label for="connectdialect">{{ labels.connectdialect_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.connectdialect.$error}">
              <select ref="connectdialect" v-model="localData.connectdialect" class="form-control input-md">
                <option v-for="(value,key) in dataCategory.tdialects" :key="key" :value="key">{{value}}</option>
              </select>
              <label class="required">*</label>
            </div>
            <span v-if="v$.connectdialect.$error" class="has-error">{{ v$.connectdialect.$errors[0].$message }}</span>
          </div>
        </div>
        <div id="apilayer" v-show="localData.connecttype == 'API'">
          <div class="row row-height">
            <div class="col-height col-md-10">              
              <label for="connectapi">{{ labels.connectapi_label }}</label>
              <div class="input-group has-validation" :class="{'has-error': v$.connecttype.$error}">
                <input ref="connectapi" type="text" v-model="localData.connectapi" id="connectapi" class="form-control input-md" maxlength="150" />
                <label class="required">*</label>
              </div>
              <span v-if="v$.connectapi.$error" class="has-error">{{ v$.connectapi.$errors[0].$message }}</span>
            </div>
          </div>
          <div class="row row-height">
            <div class="col-height col-md-10">
              <label for="connectsetting">{{ labels.connectsetting_label }}</label>
              <div class="input-group has-validation" :class="{'has-error': v$.connectsetting.$error}">
                <textarea ref="connectsetting" v-model="localData.connectsetting" id="connectsetting" class="form-control input-md validate-json" rows="2"></textarea>
              </div>
              <span v-if="v$.connectsetting.$error" class="has-error">{{ v$.connectsetting.$errors[0].$message }}</span>
              <label id="connectsettinginfo_label">{{ labels.connectsettinginfo_label }}</label>
            </div>
          </div>
          <div class="row row-height">
            <div class="col-height col-md-10">
              <label for="connectbody">{{ labels.connectbody_label }}</label>
              <div class="input-group has-validation" :class="{'has-error': v$.connectbody.$error}">
                <textarea ref="connectbody" v-model="localData.connectbody" id="connectbody" class="form-control input-md validate-json" rows="2"></textarea>
              </div>
              <span v-if="v$.connectbody.$error" class="has-error">{{ v$.connectbody.$errors[0].$message }}</span>
              <label id="connectbodyinfo_label">{{ labels.connectbodyinfo_label }}</label>
            </div>
          </div>
        </div>
        <div id="dblayer" v-show="localData.connecttype == 'DB'">
          <div id="providedlayer">
            <div id="urllayer" v-show="dialectUsingURL">
              <div class="row row-height">
                <div class="col-height col-md-12">
                  <label for="connecturl">{{ labels.connecturl_label }}</label>
                  <div class="input-group has-validation" :class="{'has-error': v$.connecturl.$error}">
                    <input ref="connecturl" type="text" v-model="localData.connecturl" id="connecturl" class="form-control input-md" maxlength="250" />
                    <label class="required">*</label>
                  </div>
                  <span v-if="v$.connecturl.$error" class="has-error">{{ v$.connecturl.$errors[0].$message }}</span>
                </div>
              </div>
            </div>
            <div id="unurllayer" v-show="!dialectUsingURL">
              <div class="row row-height">
                <div class="col-height col-md-4">
                  <label for="connectuser">{{ labels.connectuser_label }}</label>
                  <div class="input-group has-validation" :class="{'has-error': v$.connectuser.$error}">
                    <input ref="connectuser" type="text" v-model="localData.connectuser" id="connectuser" class="form-control input-md" maxlength="200" />
                    <label class="required">*</label>
                  </div>
                  <span v-if="v$.connectuser.$error" class="has-error">{{ v$.connectuser.$errors[0].$message }}</span>
                </div>
                <div class="col-height col-md-4">
                  <label for="connectpassword">{{ labels.connectpassword_label }}</label>
                  <div class="input-group has-validation" :class="{'has-error': v$.connectpassword.$error}">
                    <input ref="connectpassword" type="password" v-model="localData.connectpassword" id="connectpassword" class="form-control input-md" maxlength="50" />
                    <label class="required">*</label>
                  </div>
                  <span v-if="v$.connectpassword.$error" class="has-error">{{ v$.connectpassword.$errors[0].$message }}</span>
                </div>
              </div>
              <div class="row row-height">
                <div class="col-height col-md-4">
                  <label for="connectdatabase">{{ labels.connectdatabase_label }}</label>
                  <div class="input-group has-validation" :class="{'has-error': v$.connectdatabase.$error}">
                    <input ref="connectdatabase" type="text" v-model="localData.connectdatabase" id="connectdatabase" class="form-control input-md" maxlength="50" />
                    <label class="required">*</label>
                  </div>
                  <span v-if="v$.connectdatabase.$error" class="has-error">{{ v$.connectdatabase.$errors[0].$message }}</span>
                </div>
                <div class="col-height col-md-4">
                  <label for="connecthost">{{ labels.connecthost_label }}</label>
                  <div class="input-group has-validation" :class="{'has-error': v$.connecthost.$error}">
                    <input ref="connecthost" type="text" v-model="localData.connecthost" id="connecthost" class="form-control input-md" maxlength="50" />
                    <label class="required">*</label>
                  </div>
                  <span v-if="v$.connecthost.$error" class="has-error">{{ v$.connecthost.$errors[0].$message }}</span>
                </div>
                <div class="col-height col-md-4">
                  <label for="connectport">{{ labels.connectport_label }}</label>
                  <div class="input-group has-validation" :class="{'has-error': v$.connectport.$error}">
                    <InputNumber ref="connectport" v-model="localData.connectport" id="connectport" class="form-control input-md" />
                    <label class="required">*</label>
                  </div>
                  <span v-if="v$.connectport.$error" class="has-error">{{ v$.connectport.$errors[0].$message }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </template>
    <template v-slot:footer>
      <button ref="savebutton" id="savebuttonconnect" class="btn btn-dark btn-sm" @click="saveClick" v-if="insertMode"><em class="fa fa-save fa-btn-icon"></em>{{ labels.save_button }}</button>
      <button ref="updatebutton" id="updatebuttonconnect" class="btn btn-dark btn-sm" @click="updateClick" v-if="updateMode"><em class="fa fa-save fa-btn-icon"></em>{{ labels.update_button }}</button>
      <button id="canceldialogbuttonconnect" class="btn btn-dark btn-sm cancel-dialog-button" data-dismiss="modal"><em class="fa fa-close fa-btn-icon"></em>{{ labels.cancel_button }}</button>
    </template>
  </DialogForm>
</template>
<script>
import { v4 as uuid } from 'uuid';
import { ref, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import $ from "jquery";
import { DEFAULT_CONTENT_TYPE, getApiUrl, disableControls }  from '@willsofts/will-app';
import { startWaiting, stopWaiting, submitFailure, detectErrorResponse }  from '@willsofts/will-app';
import { confirmUpdate, confirmSave, confirmDelete, successbox, serializeParameters } from '@willsofts/will-app';
import { InputNumber } from '@willsofts/will-control';
import DialogForm from './DialogForm.vue';
import { validJSON } from "../assets/js/app.libs.js";

const APP_URL = "/api/aife001";
const defaultData = {
  connectid: "",
  connectname: "",
  connecttype: "",
  connectdialect: "",
  connecturl: "",
  connectuser: "",
  connectpassword: "",
  connectdatabase: "",
  connecthost: "",
  connectport: null,
  connectapi: "",
  connectsetting: "",
  connectbody: "",
};

export default {
  components: {
    DialogForm, InputNumber
  },
  props: {
    modes: Object,
    labels: Object,
    dataCategory: Object
  },
  emits: ["connect-saved","connect-updated","connect-deleted"],
  setup(props) {
    const mode = ref({action: "new", ...props.modes});
    const localData = ref({ ...defaultData }); 
    const disabledKeyField = ref(false);
    const reqalert = ref(props.labels.empty_alert);
    const requiredMessage = () => {
      return helpers.withMessage(reqalert, required);
    }
    const dialects = ref(props.dataCategory.dialects);
    const isAPI = () => { return localData.value.connecttype == "API"; };
    const isUsingUrl = (value) => { let cat = dialects.value[value]; return cat && cat.urlflag == "1"; };
    const validateRules = computed(() => { 
      return {
        connectid: { required: requiredMessage() },
        connectname: { required: requiredMessage() },
        connecttype: { required: requiredMessage() },
        connectdialect: { required: requiredMessage() },
        connecturl: { 
          validUrl: helpers.withMessage(reqalert, helpers.withParams({ type: "required" },value => { 
            if(!isAPI() && isUsingUrl(localData.value.connectdialect)) {
              if(value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connectuser: { 
          validUser: helpers.withMessage(reqalert, helpers.withParams({ type: "required" },value => { 
            if(!isAPI() && !isUsingUrl(localData.value.connectdialect)) {
              if(value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connectpassword: { 
          validPassword: helpers.withMessage(reqalert, helpers.withParams({ type: "required" },value => { 
            if(!isAPI() && !isUsingUrl(localData.value.connectdialect)) {
              if(value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connectdatabase: { 
          validDb: helpers.withMessage(reqalert, helpers.withParams({ type: "required" },value => { 
            if(!isAPI() && !isUsingUrl(localData.value.connectdialect)) {
              if(value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connecthost: { 
          validHost: helpers.withMessage(reqalert, helpers.withParams({ type: "required" },value => { 
            if(!isAPI() && !isUsingUrl(localData.value.connectdialect)) {
              if(value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connectport: { 
          validPort: helpers.withMessage(reqalert, helpers.withParams({ type: "required" },value => { 
            if(!isAPI() && !isUsingUrl(localData.value.connectdialect)) {
              if(value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connectapi: { 
          validApi: helpers.withMessage(reqalert, helpers.withParams({ type: "required", index: props.index },value => { 
            if(isAPI()) {
              if(value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connectsetting: { 
          validSetting: helpers.withMessage("Invalid JSON format setting", helpers.withParams({ type: "required", index: props.index },value => validJSON(value)) )
        },
        connectbody: { 
          validBody: helpers.withMessage("Invalid JSON format setting", helpers.withParams({ type: "required", index: props.index },value => validJSON(value)) )
        },
      } 
    });
    const v$ = useVuelidate(validateRules, localData, { $lazy: true, $autoDirty: true, $scope: false });
    return { mode, v$, localData, disabledKeyField, reqalert };
  },
  created() {
    watch(this.$props, (newProps) => {      
      this.reqalert = newProps.labels.empty_alert;
    });
  },
  computed: {
    insertMode() {
      return this.mode.action=="insert" || this.mode.action=="new";
    },
    updateMode() {
      return this.mode.action=="update" || this.mode.action=="edit";
    },
    dialectUsingURL() {
      let cat = this.$props.dataCategory.dialects[this.localData.connectdialect];
      return cat && cat.urlflag == "1";
    },
  },
  mounted() {
    this.$nextTick(function () {
      $("#modaldialog_layer_connection").find(".modal-dialog").draggable();
    });
  },
  methods: {
    dialectProvided(dialect) {
      let cat = this.$props.dataCategory.dialects[dialect];
      //console.log("dialectProvided: dialect",dialect,":",cat);
      return cat && cat.providedflag == "1";
    },
    reset(newData,newMode) {
      if(newData) this.localData = {...newData};
      if(newMode) this.mode = {...newMode};
    },
    submit() {      
      this.$emit('update:formData', this.localData);
    },
    async saveClick() {
      console.log("click: save");
      disableControls($("#savebuttonconnect"));
      let valid = await this.validateForm();
      if(!valid) return;
      this.startSaveRecord();
    },
    async updateClick() {
      console.log("click: update");
      disableControls($("#updatebuttonconnect"));
      let valid = await this.validateForm();
      if(!valid) return;
      this.startUpdateRecord();
    },
    async validateForm(focusing=true) {
      const valid = await this.v$.$validate();
      console.log("validate form: valid",valid);
      console.log("error:",this.v$.$errors);
      if(!valid) {
        if(focusing) {
          this.focusFirstError();
        }
        return false;
      }
      return true;
    },
    focusFirstError() {
      if(this.v$.$errors && this.v$.$errors.length > 0) {
        let input = this.v$.$errors[0].$property;
        let el = this.$refs[input];
        if(el) el.focus(); //if using ref
        else $("#"+input).trigger("focus"); //if using id
      }
    },
    showDialog(callback) {
      //$("#modaldialog_layer").modal("show");
      if(callback) $(this.$refs.dialogFormConnection.$el).on("shown.bs.modal",callback);
      $(this.$refs.dialogFormConnection.$el).modal("show");
    },  
    hideDialog() {
      //$("#modaldialog_layer").modal("hide");
      $(this.$refs.dialogFormConnection.$el).modal("hide");
    },
    resetRecord() {
      //reset to default data 
      this.reset(defaultData,{action:"insert"});
      //reset validator
      this.v$.$reset();
      //enable key field
      this.disabledKeyField = false;
    },
    newRecord() {
      this.resetRecord();
      this.localData.connectid = uuid();
      this.localData.connecttype = "DB";
    },
    startInsertRecord() {
      this.newRecord();
      this.showDialog(() => { this.$refs.connectname.focus(); });
    },
    startSaveRecord() {
      confirmSave(() => {
        this.saveRecord(this.localData);
      });
    },
    startUpdateRecord() {
      confirmUpdate(() => { 
        this.updateRecord(this.localData);
      });
    },
    startDeleteRecord(dataKeys) {
      confirmDelete(Object.values(dataKeys),() => {
        this.deleteRecord(dataKeys);
      });
    },
    saveRecord(dataRecord) {
        let jsondata = {ajax: true};
        let formdata = serializeParameters(jsondata,dataRecord);
        startWaiting();
        $.ajax({
          url: getApiUrl()+APP_URL+"/connectinsert",
          data: formdata.jsondata,
          headers : formdata.headers,
          type: "POST",
          dataType: "json",
          contentType: DEFAULT_CONTENT_TYPE,
          error : function(transport,status,errorThrown) {
            console.error("error: status",status,"errorThrown",errorThrown);
            submitFailure(transport,status,errorThrown);
          },
          success: (data) => {
            stopWaiting();
            console.log("success",data);
            if(detectErrorResponse(data)) return;
            successbox(() => {
              //reset data for new record insert
              setTimeout(() => { this.$refs.connectname.focus(); },100);
              this.$emit('connect-saved',dataRecord,data);
              this.newRecord();
            });
          }
      });
    },
    updateRecord(dataRecord) {
        let jsondata = {ajax: true};
        let formdata = serializeParameters(jsondata,dataRecord);
        startWaiting();
        $.ajax({
          url: getApiUrl()+APP_URL+"/connectupdate",
          data: formdata.jsondata,
          headers : formdata.headers,
          type: "POST",
          dataType: "json",
          contentType: DEFAULT_CONTENT_TYPE,
          error : function(transport,status,errorThrown) {
            console.error("error: status",status,"errorThrown",errorThrown);
            submitFailure(transport,status,errorThrown);
          },
          success: (data) => {
            stopWaiting();
            console.log("success",data);
            if(detectErrorResponse(data)) return;
            successbox(() => {
              this.hideDialog();
              this.$emit('connect-updated',dataRecord,data);
            });
          }
      });
    },
    retrieveRecord(dataKeys) {
      let jsondata = {ajax: true};
      let formdata = serializeParameters(jsondata,dataKeys);
      startWaiting();
      $.ajax({
        url: getApiUrl()+APP_URL+"/connectretrieve",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("retrieveRecord: error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("retrieveRecord: success",data);
          if(data.body.dataset) {
            this.reset(data.body.dataset,{action:"edit"});
            this.v$.$reset();
            this.disabledKeyField = true;
            this.showDialog(() => {               
              this.$refs.connectname.focus(); 
            });
          }
        }
      });	
    },
    deleteRecord(dataKeys) {
      let jsondata = {ajax: true};
      let formdata = serializeParameters(jsondata,dataKeys);
      startWaiting();
      $.ajax({
        url: getApiUrl()+APP_URL+"/connectremove",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("deleteRecord: error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("deleteRecord: success",data);
          if(detectErrorResponse(data)) return;
          successbox(() => {
            this.$emit('connect-deleted',dataKeys,data);
          });
        }
      });	
    },
  }
};
</script>
