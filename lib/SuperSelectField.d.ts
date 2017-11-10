declare module 'SuperSelectField' {
    import {Component} from 'react';

    export interface SelectFieldProps {
        anchorOrigin?: any;
        style?: any;
        menuStyle?: any;
        menuGroupStyle?: any;
        checkPosition?: any;
        checkedIcon?: any;
        unCheckedIcon?: any;
        hoverColor?: any;
        children?: any;
        innerDivStyle?: any;
        selectedMenuItemStyle?: any;
        menuFooterStyle?: any;
        name?: any;
        floatingLabel?: any;
        floatingLabelFocusStyle?: any;
        underlineStyle?: any;
        underlineFocusStyle?: any;
        autocompleteUnderlineStyle?: any;
        autocompleteUnderlineFocusStyle?: any;
        hintText?: any;
        hintTextAutocomplete?: any;
        noMatchFound?: any;
        noMatchFoundStyle?: any;
        showAutocompleteThreshold?: any;
        elementHeight?: any;
        nb2show?: any;
        value?: any;
        autocompleteFilter?: any;
        selectionsRenderer?: any;
        menuCloseButton?: any;
        canAutoPosition?: any;
        multiple?: any;
        openImmediately?: any;
        keepSearchOnSelect?: any;
        disabled?: any;
        onChange?: any;
        onMenuOpen?: any;
        onAutoCompleteTyping?: any;
    }

    export default class SelectField extends Component<SelectFieldProps, any> {
        render(): JSX.Element;

    }

}

