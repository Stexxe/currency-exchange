export const exchange = ({value: valueFrom}, {value: valueTo}, money) => {
    return valueFrom / valueTo * money;
};