import React from 'react';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

// possible snackbar variants: [ default, error, success, warning, info]
const useNotifications = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const addNotification = (message, variant) => {
        return enqueueSnackbar(message, {
            // eslint-disable-next-line react/display-name
            action: (key) => (
                <Button onClick={() => closeSnackbar(key)}>dismiss</Button>
            ),
            variant: variant ?? 'info',
            preventDuplicate: true,
        });
    };
    return { addNotification };
};

export default useNotifications;
