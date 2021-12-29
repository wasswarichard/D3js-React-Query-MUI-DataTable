import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';

interface checkBoxGroupProps {
   selectedCardType: string[];
   setSelectedCardType: (value: string[]) => void;
}

const CheckBoxGroup: React.FC<checkBoxGroupProps> = ({ selectedCardType, setSelectedCardType }) => {
   const [paymentTypeChecked, setPaymentTypeChecked] = useState<string[]>(selectedCardType);

   useEffect(() => {
      setSelectedCardType(paymentTypeChecked);
   }, [paymentTypeChecked, setSelectedCardType]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLHtmlElement | any>) => {
      if (paymentTypeChecked.includes(event.target.value)) {
         setPaymentTypeChecked(
            paymentTypeChecked.filter((payment: string) => payment !== event.target.value)
         );
      } else {
         setPaymentTypeChecked([...paymentTypeChecked, event.target.value]);
      }
   };
   return (
      <FormControl component="fieldset">
         <FormGroup aria-label="position" row>
            <FormControlLabel
               value="VISA"
               control={<Checkbox />}
               onChange={handleChange}
               checked={paymentTypeChecked.includes('VISA')}
               label="Visa"
            />
            <FormControlLabel
               value="MASTERCARD"
               control={<Checkbox />}
               onChange={handleChange}
               checked={paymentTypeChecked.includes('MASTERCARD')}
               label="Master Card"
            />
            <FormControlLabel
               value="AMERICANEXPRESS"
               control={<Checkbox />}
               onChange={handleChange}
               checked={paymentTypeChecked.includes('AMERICANEXPRESS')}
               label="American Express"
            />
         </FormGroup>
      </FormControl>
   );
};

export default CheckBoxGroup;
