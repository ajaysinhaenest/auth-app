/* eslint-disable @typescript-eslint/no-unused-vars */
import dvr from 'mobx-react-form/lib/validators/DVR';
import en from 'validatorjs/src/lang/en';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import {FormEvent} from 'react';
import {reaction} from 'mobx';

validatorjs.setMessages('en', en);
function mobxFormValidation(
  fields: any,
  successHandler = (form?: FormEvent) => null,
  errorHandler = () => null,
) {
  const hooks: any = {};

  const plugins: any = {
    dvr: dvr({
      package: validatorjs,
      // extend: ({validator}: any) => registerRule(rules, validator),
      extend: ({validator}: any) => {
        const messages = validator.getMessages('en');
        // console.log('messages', messages);
        messages.between =
          'This :attribute length must be between :min and :max characters.';
        validator.setMessages('en', messages);
      },
    }),
  };

  const formOptions: any = {
    validateOnChange: true,
  };

  if (successHandler) {
    hooks.onSuccess = successHandler;
  }

  if (errorHandler) {
    hooks.onError = errorHandler;
  }

  hooks.onInit = (form: MobxReactForm) => {
    reaction(
      () => form.values(),
      () => form.validate(),
    );
  };

  return new MobxReactForm({fields}, {plugins, hooks});
}

export {mobxFormValidation};
