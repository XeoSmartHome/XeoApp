
//export const API_URL = 'https://api.xeosmarthome.com/v1/';
export const API_URL = 'https://dashboard.xeosmarthome.com/api/';

// GENERAL
export const API_STATUS_URL = API_URL + 'status';
export const TERMS_AND_CONDITIONS_URL = 'https://xeosmarthome.com/xeoapp_terms_and_conditions';

// ACCOUNT
export const API_CREATE_ACCOUNT = API_URL + 'create_account';
export const API_LOGIN_URL = API_URL + 'login';
export const API_LOGIN_WITH_GOOGLE = API_URL + 'login_with_google';
export const API_LOGIN_WITH_FACEBOOK = API_URL + 'login_with_facebook';
export const API_LOGOUT = API_URL + 'logout';
export const API_IS_AUTHENTICATED = API_URL + 'is_authenticated';
export const API_GET_USER_PROFILE = API_URL + 'user_profile';
export const API_UPDATE_PASSWORD = API_URL + 'update_password';

// DEVICES
export const API_LOAD_DEVICES = API_URL + 'devices';
export const API_ADD_DEVICE = API_URL + 'add_device';
export const API_DELETE_DEVICE = API_URL + 'delete_device';
export const API_CHANGE_DEVICE_NAME = API_URL + 'set_device_name';
export const API_LOAD_DEVICE = API_URL + 'device/';
export const API_CONTROL_DEVICE = API_URL + 'control_device';
export const API_DEVICE_IMAGES_URL = 'https://dashboard.xeosmarthome.com/device_images/';
export const API_DEFAULT_IMAGES_URL = 'https://dashboard.xeosmarthome.com/static/default_device_images/';
export const API_GET_DEVICE_TIMED_ACTIONS = API_URL + 'get_device_timed_actions';
export const API_ADD_ACTION = API_URL + 'add_device_timed_action';
export const API_UPDATE_DEVICE_TIMED_ACTION = API_URL + 'update_device_timed_action';
export const API_DELETE_ACTION = API_URL + 'delete_action';
export const API_DELETE_TIMED_ACTIONS_MULTIPLE = API_URL + 'delete_timed_actions_multiple';
export const API_GET_DEVICE_TIMED_ACTION = API_URL + 'get_device_timed_action';
export const API_UPDATE_DEVICE_IMAGE = API_URL + 'update_device_image';

export const API_GET_DEVICE = API_URL + 'device';

// SENSORS
export const API_LOAD_SENSORS = API_URL + 'sensors';

// ROOMS
export const API_GET_ROOMS = API_URL + 'rooms';
export const API_CREATE_ROOM = API_URL + 'create_room';
export const API_DELETE_ROOM = API_URL + 'delete_room';
export const API_UPDATE_ROOMS_ORDER = API_URL + 'update_rooms_order';
export const API_ADD_DEVICE_IN_ROOM = API_URL + 'room/add_device';
export const API_REMOVE_DEVICE_FROM_ROOM = API_URL + 'room/remove_device'
export const API_UPDATE_DEVICES_ORDER_IN_ROOM = API_URL + 'room/update_device_order';

// ACTION LINKS

export const API_GET_ACTION_LINKS = API_URL + 'action_link/device/';
export const API_GENERATE_ACTION_LINK = API_URL + 'action_link/generate';
export const API_DELETE_ACTION_LINK = API_URL + 'action_link/delete';
