export const exchange = ({value: valueFrom}, {value: valueTo}, money) => {
    const rate = valueFrom / valueTo;
    return rate * money;
};