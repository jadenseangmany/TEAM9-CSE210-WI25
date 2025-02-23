declare module 'react-native-vector-icons/Ionicons' {
    import { Component } from 'react';
    import { TextStyle } from 'react-native';
    
    export interface IconProps {
      name: string;
      size?: number;
      color?: string;
      style?: TextStyle;
      [x: string]: any;
    }
    
    export default class Icon extends Component<IconProps> {}
  }
  