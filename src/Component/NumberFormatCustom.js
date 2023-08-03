import React from 'react';
import CurrencyFormat from 'react-currency-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <CurrencyFormat
      {...other}
      getInputRef={inputRef}
      prefix={''}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}
export default NumberFormatCustom;
