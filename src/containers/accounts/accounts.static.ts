import { InstitutionTypeEnum } from 'api/accounts/accounts.types'

import XpLogo from 'assets/institutions/xp.png'
import BBLogo from 'assets/institutions/bb.png'
import BradescoLogo from 'assets/institutions/bradesco.png'
import CaixaLogo from 'assets/institutions/caixa.png'
import InterLogo from 'assets/institutions/inter.png'
import ItauLogo from 'assets/institutions/itau.png'
import NubankLogo from 'assets/institutions/nubank.png'
import SantanderLogo from 'assets/institutions/santander.png'
import SicoobLogo from 'assets/institutions/sicoob.png'
import SicrediLogo from 'assets/institutions/sicredi.png'
import OtherLogo from 'assets/institutions/other.png'

export const institutionLogoMap = {
  [InstitutionTypeEnum.XP]: XpLogo,
  [InstitutionTypeEnum.BANCO_DO_BRASIL]: BBLogo,
  [InstitutionTypeEnum.BRADESCO]: BradescoLogo,
  [InstitutionTypeEnum.CAIXA]: CaixaLogo,
  [InstitutionTypeEnum.INTER]: InterLogo,
  [InstitutionTypeEnum.ITAU]: ItauLogo,
  [InstitutionTypeEnum.NUBANK]: NubankLogo,
  [InstitutionTypeEnum.SANTANDER]: SantanderLogo,
  [InstitutionTypeEnum.SICOOB]: SicoobLogo,
  [InstitutionTypeEnum.SICREDI]: SicrediLogo,
  [InstitutionTypeEnum.OTHER]: OtherLogo,
}
