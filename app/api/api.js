import {apiRequest} from "./requests";
import {ROUTES} from "./routes";


export const API = {
    account:{
        /**
         *
         * @param {string} params.first_name
         * @param {string} params.last_name
         * @param {string} params.email
         * @param {string} params.password
         * @return {*}
         */
        createAccount: (params) => apiRequest(ROUTES.ACCOUNT.CREATE_ACCOUNT, params),

        /**
         *
         * @param {string} params.email
         * @param {string} params.password
         * @return {*}
         */
        login: (params) => apiRequest(ROUTES.ACCOUNT.LOGIN, params),

        /**
         *
         * @param {string} params.token
         * @return {*}
         */
        loginWithGoogle: (params) => apiRequest(ROUTES.ACCOUNT.LOGIN_WITH_FACEBOOK, params),

        /**
         *
         * @param {string} params.token
         * @return {*}
         */
        loginWithFacebook: (params) => apiRequest(ROUTES.ACCOUNT.LOGIN_WITH_FACEBOOK, params),

        /**
         *
         * @return {*}
         */
        logout: () => apiRequest(ROUTES.ACCOUNT.LOGOUT, {}),

        /**
         *
         * @return {*}
         */
        getUserProfile: () => apiRequest(ROUTES.ACCOUNT.GET_USER_PROFILE, {}),

        /**
         *
         * @param {string} params.current_password
         * @param {string} params.new_password
         * @return {*}
         */
        updatePassword: (params) => apiRequest(ROUTES.ACCOUNT.UPDATE_PASSWORD, params),

        /**
         *
         * @return {*}
         */
        isAuthenticated: () => apiRequest(ROUTES.ACCOUNT.IS_AUTHENTICATED, {})
    },

    devices: {
        /**
         * Load user's devices.
         * @return {*}
         */
        getDevices: () => apiRequest(ROUTES.DEVICES.GET_DEVICES, {}),

        /**
         * Get a device by id.
         * @param {number} params.id
         * @return {*}
         */
        getDevice: (params) => apiRequest(ROUTES.DEVICES.GET_DEVICE, params),

        /**
         * Register a new device in user's account.
         * @param {string} params.name
         * @param {string} params.serial
         * @return {*}
         */
        registerDevice: (params) => apiRequest(ROUTES.DEVICES.REGISTER_DEVICE, params),

        /**
         * Removes a device from user's account.
         * @param {number} params.id
         * @return {*}
         */
        removeDevice: (params) => apiRequest(ROUTES.DEVICES.DELETE_DEVICE, params),

        /**
         * Updates a device's name.
         * @param {number} params.id
         * @param {string} params.name
         * @return {*}
         */
        updateDeviceName: (params) => apiRequest(ROUTES.DEVICES.UPDATE_DEVICE_NAME, params),

        /**
         * Updates a device's image.
         * @param {number} params.id
         * @param params.image
         */
        updateDeviceImage: (params) => apiRequest(ROUTES.DEVICES.UPDATE_DEVICE_IMAGE, params),

        /**
         *
         * @param {number} params.device_id
         * @param {number} params.action_type_id
         * @param {[{
         *     parameter_type_id: number,
         *     value: number
         * }]} params.parameters
         * @return {*}
         */
        callAction: (params) => apiRequest(ROUTES.DEVICES.CALL_ACTION, params),

        timed_actions: {

            /**
             *
             * @param {number} params.device_id
             * @return {*}
             */
            getTimedActions: (params) => apiRequest(ROUTES.DEVICES.TIMED_ACTIONS.GET_ACTIONS, params),

            /**
             *
             * @param {number} params.device_id
             * @param {number} params.action_id
             * @return {*}
             */
            getTimedAction: (params) => apiRequest(ROUTES.DEVICES.TIMED_ACTIONS.GET_ACTION, params),

            /**
             *
             * @param {number} params.action_type_id
             * @param {number} params.device_id
             * @return {*}
             */
            createTimedAction: (params) => apiRequest(ROUTES.DEVICES.TIMED_ACTIONS.CREATE_ACTION, params),

            /**
             *
             * @param {number} params.device_id
             * @param {number} params.action_id
             * @param {string} params.cron
             * @param {[{
             *     name: string,
             *     value: number
             * }]} params.parameters
             * @return {*}
             */
            updateTimedAction: (params) => apiRequest(ROUTES.DEVICES.TIMED_ACTIONS.UPDATE_ACTION, params),

            /**
             *
             * @param {number} params.device_id
             * @param {[number]} params
             *
             * @return {*}
             */
            deleteTimedActions: (params) => apiRequest(ROUTES.DEVICES.TIMED_ACTIONS.DELETE_MULTIPLE, params)
        },

        action_links: {
            /**
             *
             * @param {number} params.device_id
             * @return {*}
             */
            getActionsLinks: (params) => apiRequest(ROUTES.DEVICES.ACTION_LINKS.GET_ACTIONS_LINKS, params),

            /**
             *
             * @param {number} params.device_id
             * @param {number} params.action_type_id
             * @param {[{id: number}]} params.parameters
             * @return {*}
             */
            createActionLink: (params) => apiRequest(ROUTES.DEVICES.ACTION_LINKS.CREATE_ACTION_LINK, params),

            /**
             * 
             * @param {number} params.device_id
             * @param {number} params.action_link_id
             * @return {*}
             */
            deleteActionLink: (params) => apiRequest(ROUTES.DEVICES.ACTION_LINKS.GET_ACTIONS_LINKS, params),
        }
    },

    sensors: {
        getSensors: (params) => apiRequest(ROUTES.SENSORS.GET_SENSORS, params)
    },

    house: {
        /**
         *
         * @param {number} params.house_id
         * @param {number[]} params.order
         * @return {*}
         */
        updateRoomsOrder: (params) => apiRequest(ROUTES.HOUSE.UPDATE_ROOMS_ORDER, params),

        rooms: {
            /**
             *
             * @param {number} params.house_id
             * @return {*}
             */
            getRooms: (params) => apiRequest(ROUTES.ROOMS.GET_ROOMS, params),

            /**
             *
             * @param {number} params.house_id
             * @param {number} params.name
             * @return {*}
             */
            createRoom: (params) => apiRequest(ROUTES.ROOMS.CREATE_ROOM, params),

            /**
             *
             * @param {number} params.house_id
             * @param {number} params.room_id
             * @return {*}
             */
            deleteRoom: (params) => apiRequest(ROUTES.ROOMS.DELETE_ROOM, params),

            /**
             *
             * @param {number} params.house_id
             * @param {number} params.room_id
             * @param {number} params.device_id
             * @return {*}
             */
            addDevice: (params) => apiRequest(ROUTES.ROOMS.ADD_DEVICE, params),

            /**
             *
             * @param {number} params.house_id
             * @param {number} params.room_id
             * @param {number} params.device_id
             * @return {*}
             */
            removeDevice: (params) => apiRequest(ROUTES.ROOMS.REMOVE_DEVICE, params),

            /**
             *
             * @param {number} params.house_id  id of the house
             * @param {number} params.room_id   id of the room
             * @param {number[]} params.order   id of devices
             * @return {*}
             */
            updateDevicesOrder: (params) => apiRequest(ROUTES.ROOMS.UPDATE_DEVICES_ORDER, params)
        }
    }
}
