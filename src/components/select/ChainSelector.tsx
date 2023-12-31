/* eslint-disable @typescript-eslint/ban-types */
import { Option, optionClasses } from '@mui/base/Option';
import { Popper } from '@mui/base/Popper';
import {
  Select,
  selectClasses,
  SelectProps,
  SelectRootSlotProps,
} from '@mui/base/Select';
import { styled } from '@mui/system';
import * as React from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const defaultTheme = 'dark';

const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
});

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ...other } = props;
  return (
    <button type='button' {...other} ref={ref}>
      {other.children}
    </button>
  );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${defaultTheme === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${defaultTheme === 'dark' ? grey[700] : grey[200]};
  color: ${defaultTheme === 'dark' ? grey[300] : grey[900]};
  position: relative;
  box-shadow: 0px 2px 24px ${defaultTheme === 'dark' ? blue[900] : blue[100]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${defaultTheme === 'dark' ? grey[800] : grey[50]};
    border-color: ${defaultTheme === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${defaultTheme === 'dark' ? blue[500] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${defaultTheme === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${defaultTheme === 'dark' ? grey[700] : grey[200]};
  color: ${defaultTheme === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${
    defaultTheme === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  `
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${defaultTheme === 'dark' ? blue[900] : blue[100]};
    color: ${defaultTheme === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${defaultTheme === 'dark' ? grey[800] : grey[100]};
    color: ${defaultTheme === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${defaultTheme === 'dark' ? blue[900] : blue[100]};
    color: ${defaultTheme === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${defaultTheme === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${defaultTheme === 'dark' ? grey[800] : grey[100]};
    color: ${defaultTheme === 'dark' ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;

const Label = styled('label')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 4px;
  font-weight: 400;
  color: ${defaultTheme === 'dark' ? grey[400] : grey[700]};
  `
);

export default function UnstyledSelectIntroduction() {
  const { chain, chains } = useNetwork();
  const [value, setValue] = React.useState<number | null>(chain?.id || null);
  const { switchNetwork } = useSwitchNetwork();

  React.useEffect(() => {
    if (!chain) return;
    setValue(chain.id);
  }, [chain]);
  return (
    <div>
      <Label
        id='object-value-default-label'
        htmlFor='object-value-default-button'
      >
        Source Chain
      </Label>
      <CustomSelect
        value={value}
        onChange={(_, newValue) => setValue(newValue as number)}
      >
        {chains.map((chain) => (
          <StyledOption key={chain.id} value={chain.id}>
            <div
              onClick={() => {
                switchNetwork?.(chain.id);
              }}
            >
              {chain?.name}
            </div>
          </StyledOption>
        ))}
      </CustomSelect>
    </div>
  );
}
