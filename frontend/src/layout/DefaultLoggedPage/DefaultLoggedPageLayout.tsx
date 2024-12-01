import { useState } from 'react'
import Link from 'next/link'
import * as S from './DefaultLoggedPageLayout.styles'
import {
  Barn,
  Cat,
  PawPrint,
  PencilSimple,
  SignOut,
  User,
} from '@phosphor-icons/react'
import { getUserData } from '@/helpers/get-user-data'

enum MenuItemsEnum {
  AVAILABLE_ANIMALS = 'AVAILABLE_ANIMALS',
  ADD_ANIMAL = 'ADD_ANIMAL',
  MY_ANIMALS = 'MY_ANIMALS',
  EDIT_USER_DATA = 'EDIT_USER_DATA',
}

type MenuItem = {
  id: MenuItemsEnum
  label: string
  icon: JSX.Element
  route: string
}

const menuItems: MenuItem[] = [
  {
    id: MenuItemsEnum.AVAILABLE_ANIMALS,
    label: 'Animais disponíveis para adoção',
    icon: <Cat size={24} />,
    route: '/area_logada/animais_disponiveis',
  },
  {
    id: MenuItemsEnum.ADD_ANIMAL,
    label: 'Disponibilizar animal para adoção',
    icon: <PawPrint size={24} />,
    route: '/area_logada/disponibilizar_animal',
  },
  {
    id: MenuItemsEnum.MY_ANIMALS,
    label: 'Meus animais disponíveis para adoção',
    icon: <Barn size={24} />,
    route: '/area_logada/meus_animais',
  },
  {
    id: MenuItemsEnum.EDIT_USER_DATA,
    label: 'Editar dados pessoais',
    icon: <PencilSimple size={24} />,
    route: '/area_logada/editar_dados',
  },
]

export function DefaultLoggedPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItemsEnum>(
    MenuItemsEnum.AVAILABLE_ANIMALS,
  )

  const userData = getUserData()

  const handleMenuItemClick = (menuItem: MenuItem) => {
    setActiveMenuItem(menuItem.id)
  }

  return (
    <S.Wrapper>
      <S.AsideMenu>
        <S.UserInfo>
          <User size={48} />
          <span>{userData?.name}</span>
        </S.UserInfo>
        {menuItems.map((menuItem) => (
          <Link href={menuItem.route} key={menuItem.id}>
            <S.MenuItem
              $isActive={activeMenuItem === menuItem.id}
              onClick={() => handleMenuItemClick(menuItem)}
            >
              {menuItem.icon}
              <span>{menuItem.label}</span>
            </S.MenuItem>
          </Link>
        ))}
        <S.MenuItem>
          <SignOut size={24} />
          <span>Sair</span>
        </S.MenuItem>
      </S.AsideMenu>
      <S.PageContent>{children}</S.PageContent>
    </S.Wrapper>
  )
}
