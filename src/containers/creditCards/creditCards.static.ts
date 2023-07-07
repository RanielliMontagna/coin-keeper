import { FlagEnum } from 'api/creditCards/creditCards.types'

import VisaLogo from 'assets/creditCards/flags/visa.png'
import MastercardLogo from 'assets/creditCards/flags/mastercard.png'
import AmexLogo from 'assets/creditCards/flags/american-express.png'
import EloLogo from 'assets/creditCards/flags/elo.png'
import DinersLogo from 'assets/creditCards/flags/diners.png'
import DiscoverLogo from 'assets/creditCards/flags/discover.png'
import JcbLogo from 'assets/creditCards/flags/jcb.png'
import OtherLogo from 'assets/creditCards/flags/other.png'

export const flagLogoMap = {
  [FlagEnum.VISA]: VisaLogo,
  [FlagEnum.MASTERCARD]: MastercardLogo,
  [FlagEnum.AMERICAN_EXPRESS]: AmexLogo,
  [FlagEnum.ELO]: EloLogo,
  [FlagEnum.DINERS_CLUB]: DinersLogo,
  [FlagEnum.DISCOVER]: DiscoverLogo,
  [FlagEnum.JCB]: JcbLogo,
  [FlagEnum.OTHER]: OtherLogo,
}
