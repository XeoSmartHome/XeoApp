import {API_URL} from "./api_routes_v_1.0.0.0";

const POST = 'POST';
const GET = 'GET';

export const ROUTES = {
    ACCOUNT: {
        CREATE_ACCOUNT: {
            path: 'create_account',
            method: POST
        },
        LOGIN: {
            path: 'login',
            method: POST
        },
        LOGIN_WITH_GOOGLE: {
            path: 'login_with_google',
            method: POST
        },
        LOGIN_WITH_FACEBOOK: {
            path: 'login_with_facebook',
            method: POST
        },
        LOGOUT: {
            path: 'logout',
            method: POST
        },
        GET_USER_PROFILE: {
            path: 'user_profile',
            method: GET
        },
        UPDATE_PASSWORD: {
            path: 'update_password',
            method: POST
        },
        IS_AUTHENTICATED: {
            path: 'is_authenticated',
            method: POST
        }
    },
    DEVICES: {
        GET_DEVICES: {
            path: 'devices',
            method: GET
        },
        REGISTER_DEVICE: {
            path: 'add_device',
            method: POST
        },
        DELETE_DEVICE: {
            path: 'delete_device',
            method: POST
        },
        UPDATE_DEVICE_NAME: {
            path: 'set_device_name',
            method: POST
        },
        GET_DEVICE: {
            path: 'device',
            method: GET
        },
        CALL_ACTION: {
            path: 'control_device',
            method: POST
        },
        IMAGES: {
            url: 'https://xeosmarthome.com/device_images/',
            method: GET
        },
        DEFAULT_IMAGES: {
            url: 'https://xeosmarthome.com/static/default_device_images/',
            method: GET
        },
        UPDATE_DEVICE_IMAGE: {
            path: 'update_device_image',
            method: POST
        },
        TIMED_ACTIONS: {
            GET_ACTIONS: {
                path: 'get_device_timed_actions',
                method: GET
            },
            CREATE_ACTION: {
                path: 'add_device_timed_action',
                method: POST
            },
            UPDATE_ACTION: {
                path: 'update_device_timed_action',
                method: POST
            },
            DELETE_ACTION: {
                path: 'delete_action',
                method: POST
            },
            DELETE_MULTIPLE: {
                path: 'delete_timed_actions_multiple',
                method: POST
            },
            GET_ACTION: {
                path: 'get_device_timed_action',
                method: GET
            }
        },
        ACTION_LINKS: {
            GET_ACTIONS_LINKS: {
                path: 'actions_links',
                method: GET
            },
            CREATE_ACTION_LINK: {
                path: 'action_link/generate',
                method: POST
            },
            DELETE_ACTION_LINK: {
                path: 'action_link/delete',
                method: POST
            }
        }
    },
    SENSORS: {
        GET_SENSORS: {
            path: 'sensors',
            method: GET
        }
    },
    HOUSE: {
        UPDATE_ROOMS_ORDER: {
            path: 'update_rooms_order',
            method: POST
        }
    },
    ROOMS: {
        GET_ROOMS: {
            path: 'rooms',
            method: GET
        },
        CREATE_ROOM: {
            path: 'create_room',
            method: POST
        },
        DELETE_ROOM: {
            path: 'delete_room',
            method: POST
        },
        ADD_DEVICE: {
            path: 'room/add_device',
            method: POST
        },
        REMOVE_DEVICE: {
            path: 'room/remove_device',
            method: POST
        },
        UPDATE_DEVICES_ORDER: {
            path: 'room/update_devices_order',
            method: POST
        }
    }
};