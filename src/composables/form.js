export const inputUpdate = (event, data, updater) => {
        updater({
          ...data,
          [event.target.name]: event.target.value,
        });
}