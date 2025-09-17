<template>
              <div class="row row-height">
                <div class="col-height col-md-5">
<label class="control-label">{{ labels.modelid_label }}</label>
<input type="text" v-model="localData.modelid" :id="'modelid_' + localData.modelid" class="form-control input-md model-id" disabled />
                </div>
              </div>
              <div class="row row-height">
                <div class="col-height col-md-10">
<label class="control-label">{{ labels.modelname_label }}</label>
<div class="input-group has-validation" :class="{'has-error': v$.modelname.$error}">
<input type="text" v-model="localData.modelname" :id="'modelname_' + localData.modelid" class="form-control input-md irequired alert-input model-name" maxlength="150" />
</div>
<span v-if="v$.modelname.$error" class="has-error">{{ v$.modelname.$errors[0].$message }}</span>
                </div>
              </div>
              <div class="row row-height">
                <div class="col-height col-md-4">
<label class="control-label">{{ labels.modeladapter_label }}</label>
<div class="input-group has-validation" :class="{'has-error': v$.modeladapter.$error}">
<select ref="modeladapter" v-model="localData.modeladapter" :id="'modeladapter_' + localData.modelid" class="form-control input-md">
  <option value=""></option>
  <option v-for="item in dataCategory.flow_adapters" :key="item.name" :value="item.name">{{item.title}}</option>
</select>
</div>
<span v-if="v$.modeladapter.$error" class="has-error">{{ v$.modeladapter.$errors[0].$message }}</span>
                </div>
              </div>
              <div class="row row-height">
                <div class="col-height col-md-4">
<label class="control-label">{{ labels.agentmodel_label }}</label>
<div class="input-group has-validation" :class="{'has-error': v$.agentmodel.$error}">
<select ref="agentmodel" v-model="localData.agentmodel" :id="'agentmodel_' + localData.modelid" class="form-control input-md">
  <option value=""></option>
  <option v-for="[key,value] in Object.entries(dataCategory.tagentmodel)" :key="key" :value="key">{{value}}</option>
</select>
</div>
<span v-if="v$.agentmodel.$error" class="has-error">{{ v$.agentmodel.$errors[0].$message }}</span>
                </div>
                <div class="col-height col-md-6">
<label class="control-label">{{ labels.connect_label }}</label>
<div class="input-group has-validation" :class="{'has-error': v$.connectid.$error}">
<select ref="connectid" v-model="localData.connectid" :id="'connectid_' + localData.modelid" class="form-control input-md">
  <option value=""></option>
  <option v-for="[key,value] in Object.entries(dataCategory.tconnect)" :key="key" :value="key">{{value}}</option>
</select>
<a href="javascript:void(0)" @click="connectRetrieve" class="input-group-addon input-group-append input-group-text" title="Edit Connection" tabindex="-1"><em class="fa fa-edit" aria-hidden="true"></em></a>
<a href="javascript:void(0)" @click="connectInsert" class="input-group-addon input-group-append input-group-text" title="New Connection" tabindex="-1"><em class="fa fa-plus" aria-hidden="true"></em></a>
</div>
<span v-if="v$.connectid.$error" class="has-error">{{ v$.connectid.$errors[0].$message }}</span>
                </div>
              </div>
              <div class="row row-height">
                <div class="col-height col-md-12">
<label class="control-label">{{ labels.modelsettings_label }}</label>
<div class="input-group has-validation" :class="{'has-error': v$.modelsettings.$error}">
<textarea v-model="localData.modelsettings" :id="'modelsettings_' + localData.modelid" class="form-control input-md irequired alert-input model-settings validate-json" rows="10" />
</div>
<span v-if="v$.modelsettings.$error" class="has-error">{{ v$.modelsettings.$errors[0].$message }}</span>
                </div>
              </div>
              <div class="row row-height">
                <div class="col-height col-md-12">
<label class="control-label">{{ labels.modelstep_label }}</label>
<div class="input-group has-validation" :class="{'has-error': v$.modelstep.$error}">
<textarea v-model="localData.modelstep" :id="'modelstep_' + localData.modelid" class="form-control input-md irequired alert-input model-step validate-json" rows="3" />
</div>
<span v-if="v$.modelstep.$error" class="has-error">{{ v$.modelstep.$errors[0].$message }}</span>
                </div>
              </div>
  <teleport to="#connectiondialog">
    <ConnectionForm ref="connectionForm" :labels="labels" :dataCategory="dataCategory" @connect-saved="connectSaved" @connect-updated="connectUpdated" @connect-deleted="connectDeleted" />
  </teleport>
</template>
<script>
import { ref, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import $ from "jquery";
import { validJSON } from "../assets/js/app.libs.js";
import ConnectionForm from "./ConnectionForm";
import { dataCategory } from "../assets/js/app.data";

const defaultData = {
  modelid: "",
  modelname: "",
  modeladapter: "",
  agentmodel: "",
  connectid: "",
  modelsettings: "",
  modelstep: "",
};

export default {
  components: {
    ConnectionForm
  },
  props: {
    modes: Object,
    labels: Object,
    //dataCategory: Object,
    dataModel: Object,
    index: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const mode = ref({action: "new", ...props.modes});
    const localData = ref(props.dataModel); 
    const reqalert = ref(props.labels.empty_alert);
    const requiredMessage = () => {
      return helpers.withMessage(reqalert,helpers.withParams({
        type: "required",
        index: props.index,
        modelid: props.dataModel.modelid,
      },value => !!value)); 
    }
    const validateRules = computed(() => { 
      return {
        modelname: { required: requiredMessage() },
        modeladapter: { required: requiredMessage() },
        agentmodel: { 
          validAgent: helpers.withMessage(reqalert, helpers.withParams({ type: "required", index: props.index, modelid: props.dataModel.modelid },value => { 
            let flow_adapters = dataCategory.value.flow_adapters;
            let aim = flow_adapters.find(it => it.name.toUpperCase() == localData.value.modeladapter?.toUpperCase());
            if(aim) {
              let req = aim.options?.required.find(it => it.field == "ai" && it.validate);
              if(req && value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        connectid: { 
          validConnect: helpers.withMessage(reqalert, helpers.withParams({ type: "required", index: props.index, modelid: props.dataModel.modelid },value => { 
            let flow_adapters = dataCategory.value.flow_adapters;
            let aim = flow_adapters.find(it => it.name.toUpperCase() == localData.value.modeladapter?.toUpperCase());
            if(aim) {
              let req = aim.options?.required.find(it => it.field == "connection" && it.validate);
              if(req && value.trim().length==0) return false;
            }
            return true;
          }) )
        },
        modelsettings: { 
          required: requiredMessage(),
          validSettings: helpers.withMessage("Invalid JSON format setting", helpers.withParams({ type: "required", index: props.index, modelid: props.dataModel.modelid },value => validJSON(value)) )
        },
        modelstep: {  
          validStep: helpers.withMessage("Invalid JSON format setting", helpers.withParams({ type: "required", index: props.index, modelid: props.dataModel.modelid },value => validJSON(value)) )
        },
      } 
    });    
    const v$ = useVuelidate(validateRules, localData, { $lazy: true, $autoDirty: true, $scope: "entry" });
    return { mode, v$, localData, reqalert, dataCategory };
  },
  created() {
    watch(this.$props, (newProps) => {      
      this.reqalert = newProps.labels.empty_alert;
    });
  },
  methods: {
    reset(newData,newMode) {
      if(newData) this.localData = {...newData};
      if(newMode) this.mode = {...newMode};
    },
    submit() {      
      this.$emit('update:formData', this.localData);
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
    resetRecord() {
      //reset to default data 
      this.reset(defaultData,{action:"insert"});
      //reset validator
      this.v$.$reset();
    },
    connectInsert() {
      this.$refs.connectionForm.startInsertRecord();
    },
    connectRetrieve() {
      if(this.localData.connectid && this.localData.connectid.trim().length > 0) {
        this.$refs.connectionForm.retrieveRecord({connectid: this.localData.connectid});
      }
    },
    connectSaved(data,response) {
      console.log("Connection: record saved");
      console.log("data",data,"response",response);
      let tconnect = this.dataCategory.tconnect;
      if(tconnect) tconnect[data.connectid] = data.connectname;
    },
    connectUpdated(data,response) {
      console.log("Connection: record updated");
      console.log("data",data,"response",response);
    },
    connectDeleted(data,response) {
      console.log("Connection: record deleted");
      console.log("data",data,"response",response);
    },
  }
};
</script>
