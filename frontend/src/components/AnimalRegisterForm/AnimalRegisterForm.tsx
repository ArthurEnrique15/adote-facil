import { animalTypesForSelect } from '@/constants/animal-types-for-select'
import { DefaultSelect } from '../DefaultSelect'
import * as S from './AnimalRegisterForm.styles'
import { animalGenderForSelect } from '@/constants/animal-gender-for-select'
import { Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { z } from 'zod'

import * as Dialog from '@radix-ui/react-dialog'
import { DefaultDialog } from '../DefaultDialog'
import { Button } from '../Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const animalRegisterFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  type: z.string().min(1, { message: 'O tipo é obrigatório' }),
  gender: z.string().min(1, { message: 'O gênero é obrigatório' }),
  race: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  description: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  pictures: z
    .array(z.instanceof(File))
    .min(1, 'Adicione ao menos uma foto do animal')
    .max(5, { message: 'Você pode adicionar no máximo 5 fotos' }),
})

export type AnimalRegisterFormData = z.infer<typeof animalRegisterFormSchema>

// TODO consertar mensagens de erro e layout dos campos obrigatórios
export function AnimalRegisterForm() {
  const [animalPictures, setAnimalPictures] = useState<File[]>([])
  const [maxPicsWarningModalOpen, setMaxPicsWarningModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AnimalRegisterFormData>({
    resolver: zodResolver(animalRegisterFormSchema),
  })

  const handleAnimalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files)

      if (
        uploadedFiles.length > 5 ||
        animalPictures.length + uploadedFiles.length > 5
      ) {
        setMaxPicsWarningModalOpen(true)
        return
      }

      const newPictures = [...animalPictures, ...uploadedFiles]
      setAnimalPictures(newPictures)
      setValue('pictures', newPictures) // Atualiza no react-hook-form
    }
  }

  const handleRemoveAnimalPicture = (picIndex: number) => {
    const newAnimalPictures = animalPictures.filter(
      (pic, index) => picIndex !== index,
    )

    setAnimalPictures(newAnimalPictures)
    setValue('pictures', newAnimalPictures) // Atualiza no react-hook-form
  }

  const onSubmit = (data: AnimalRegisterFormData) => {
    console.log(JSON.stringify(data))
  }

  return (
    <>
      <Dialog.Root
        open={maxPicsWarningModalOpen}
        onOpenChange={setMaxPicsWarningModalOpen}
      >
        <DefaultDialog>
          <Dialog.DialogTitle>Atenção</Dialog.DialogTitle>
          <Dialog.Portal>
            <S.MaxAnimalPicturesWarningModalOverlay />
            <S.MaxAnimalPicturesWarningModalContent>
              <span>Você pode adicionar no máximo 5 fotos!</span>
              <Dialog.Close asChild>
                <Button>Fechar</Button>
              </Dialog.Close>
            </S.MaxAnimalPicturesWarningModalContent>
          </Dialog.Portal>
        </DefaultDialog>
      </Dialog.Root>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormContent>
          <S.FormRow>
            <S.AnimalNameInputWrapper>
              <label>
                <span>Nome</span>
                <input type="text" {...register('name')} />
                {errors.name && <span>{errors.name.message}</span>}
              </label>
            </S.AnimalNameInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalTypeInputWrapper>
              <span>Tipo</span>
              <DefaultSelect
                placeholder="Selecione um tipo"
                items={animalTypesForSelect}
                {...register('type')}
                onValueChange={(value) => setValue('type', value)}
              />
              {errors.type && <span>{errors.type.message}</span>}
            </S.AnimalTypeInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalGenderInputWrapper>
              <span>Gênero</span>
              <DefaultSelect
                placeholder="Selecione um gênero"
                items={animalGenderForSelect}
                {...register('gender')}
                onValueChange={(value) => setValue('gender', value)}
              />
              {errors.gender && <span>{errors.gender.message}</span>}
            </S.AnimalGenderInputWrapper>

            <S.AnimalRaceInputWrapper>
              <label>
                Raça
                <input type="text" {...register('race')} />
              </label>
            </S.AnimalRaceInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalDescriptionWrapper>
              <label>
                Descrição
                <textarea {...register('description')} />
              </label>
            </S.AnimalDescriptionWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalPicturesInputWrapper>
              <label>Fotos (máximo 5)</label>
              <input
                type="file"
                id="animalPictures"
                name="animalPictures"
                accept="image/png, image/jpeg"
                onChange={handleAnimalImageUpload}
                multiple
                disabled={animalPictures.length >= 5}
              />
              {errors.pictures && <span>{errors.pictures.message}</span>}
              <S.AddAnimalPicturesSwiper spaceBetween={10} slidesPerView={3}>
                <S.AnimalPictureSwiperSlide>
                  <S.AnimalPicturesInput
                    htmlFor="animalPictures"
                    $enabled={animalPictures.length < 5}
                  >
                    <div>
                      <Plus size={24} />
                    </div>
                    <span>Adicionar</span>
                  </S.AnimalPicturesInput>
                </S.AnimalPictureSwiperSlide>

                {animalPictures.map((file, index) => (
                  <S.AnimalPictureSwiperSlide key={index}>
                    <S.AnimalPicture
                      src={URL.createObjectURL(file)}
                      width={92}
                      height={137}
                      alt="animal picture"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAnimalPicture(index)}
                    >
                      <Trash size={16} />
                    </button>
                  </S.AnimalPictureSwiperSlide>
                ))}
              </S.AddAnimalPicturesSwiper>
            </S.AnimalPicturesInputWrapper>
          </S.FormRow>
        </S.FormContent>

        <S.FormButton>
          <Button type="submit">Cadastrar</Button>
        </S.FormButton>
      </S.Form>
    </>
  )
}
