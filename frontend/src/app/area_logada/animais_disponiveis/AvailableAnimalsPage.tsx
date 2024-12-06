'use client'

import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '@/components/Button'
import { AnimalCard } from '@/components/AnimalCard'
import { EmptyAnimals } from '@/components/EmptyAnimals'
import { DefaultDialog } from '@/components/DefaultDialog'

import { mockAnimals } from '@/mocks/animals'
import * as S from './AvailableAnimalsPage.styles'
import { useContext, useEffect } from 'react'
import { AnimalsContext } from '@/contexts/animals'

// TODO add loader to display while fetching animals
export default function AvailableAnimalsPage() {
  const { availableAnimals, fetchAvailableAnimals } = useContext(AnimalsContext)

  useEffect(() => {
    fetchAvailableAnimals()
  }, [fetchAvailableAnimals])

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Animais disponíveis para adoção</h1>
        {!!mockAnimals.length && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button>Filtrar</Button>
            </Dialog.Trigger>
            <DefaultDialog>
              <Dialog.Close asChild>
                {/* <button className="IconButton" aria-label="Close">
                    <h1>sadasdsa</h1>
                  </button> */}
              </Dialog.Close>
              {/* <AnimalForm location="modal" /> */}
            </DefaultDialog>
          </Dialog.Root>
        )}
      </S.TitleWrapper>
      {availableAnimals.length ? (
        <S.AnimalsListWrapper>
          {availableAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              listType="animals-available-to-adopt"
            />
          ))}
          {availableAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              listType="animals-available-to-adopt"
            />
          ))}
        </S.AnimalsListWrapper>
      ) : (
        <EmptyAnimals />
      )}
    </S.Wrapper>
  )
}
