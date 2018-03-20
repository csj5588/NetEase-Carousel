import { get } from './../../utils/request';

export const getWX = async values => get('/dev/regist/getInfo', values);
