type Info = {
  consumeAmount: string | number,
  balance: string | number
}

export interface isBindingState {
  visiable: boolean,
  fee: string
}

export interface isBindingProps {
  accountInfo: Info,
  dispatch: Function
}

export interface ShowAccountProps {
  money: string | number,
  title: string,
  color: string,
  btntitle: string,
  wordColor: string,
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}