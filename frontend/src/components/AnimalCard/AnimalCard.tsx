import Image from 'next/image'
import { Pencil, Trash } from '@phosphor-icons/react'
import { Button } from '@/components/Button'
import * as S from './AnimalCard.styles'

import Link from 'next/link'
import { useContext } from 'react'
import { AnimalsContext } from '@/contexts/animals'

interface AnimalCardProps {
  animal: {
    id: string
    type: string
    gender: 'Macho' | 'Fêmea'
    race: string
    description: string
    images: Array<{
      id: string
      base64: string
    }>
  }
  listType: 'my-animals' | 'animals-available-to-adopt'
}

export function AnimalCard({ animal, listType }: AnimalCardProps) {
  const { selectAnimalToShowDetails } = useContext(AnimalsContext)

  const handleGoToAnimalDetails = () => {
    // selectAnimalToShowDetails(animal.id)
  }

  const { id, type, gender, race, images } = animal

  const animalImageBase64 = images[0].base64

  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src={`data:image/jpeg;base64,${animalImageBase64}`}
          alt="Animal"
          layout="fill"
          objectFit="cover"
        />
      </S.ImageWrapper>
      <S.Content>
        <S.AnimalInfo>
          <span>Tipo: {type}</span>
          <span>Gênero: {gender}</span>
          <span>Raça: {race}</span>
        </S.AnimalInfo>
        {listType === 'my-animals' ? (
          <S.MyAnimalsButtonsWrapper>
            <Button>Confirmar adoção</Button>
            <S.MyAnimalsButton type="edit">
              <Pencil size={24} />
            </S.MyAnimalsButton>
            <S.MyAnimalsButton type="delete">
              <Trash size={24} />
            </S.MyAnimalsButton>
          </S.MyAnimalsButtonsWrapper>
        ) : (
          <Link href={`/animals/${id}`}>
            <Button onClick={handleGoToAnimalDetails}>Saiba mais</Button>
          </Link>
        )}
      </S.Content>
    </S.Wrapper>
  )
}