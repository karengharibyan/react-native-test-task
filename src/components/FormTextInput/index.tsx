import {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import {KeyboardTypeOptions, View} from 'react-native';
import {styles} from './styles';
import {Input, InputField, Text} from '@gluestack-ui/themed';
import {useMemo} from 'react';

interface IFormTextInput<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: T[FieldPath<T>];
  label?: string;
  placeholder?: string;
  variant?: 'rounded' | 'outline' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  readonly?: boolean;
}

export const FormTextInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  disabled,
  readonly,
  label,
  placeholder,
  variant = 'outline',
  keyboardType,
  size,
  ...props
}: IFormTextInput<T>) => {
  const {field, fieldState} = useController<T>({
    name,
    control,
    defaultValue,
    ...props,
  });

  // const helperText = useMemo(() => {
  //   if (
  //     fieldState.isTouched &&
  //     fieldState.invalid &&
  //     fieldState.error?.message
  //   ) {
  //     return fieldState.error?.message;
  //   }
  //   return undefined;
  // }, [fieldState.isTouched, fieldState.invalid, fieldState.error?.message]);

  const isInvalid = useMemo(() => {
    return fieldState.isTouched && fieldState.invalid;
  }, [fieldState.isTouched, fieldState.invalid]);

  const renderLabel = useMemo(() => {
    return label ? (
      <Text color="$text500" lineHeight="$xs" paddingBottom="$1">
        {label}
      </Text>
    ) : null;
  }, [label]);

  return (
    <View style={styles.root}>
      {renderLabel}
      <Input
        variant={variant}
        size={size}
        isDisabled={disabled}
        isInvalid={isInvalid}
        isReadOnly={readonly}>
        <InputField
          onChangeText={field.onChange}
          keyboardType={keyboardType}
          placeholder={placeholder}
          {...field}
        />
      </Input>
      <Text color="$red500" paddingTop="$1" textAlign="right" fontSize="$xs">
        {isInvalid ? fieldState.error?.message : ''}
      </Text>
    </View>
  );
};
