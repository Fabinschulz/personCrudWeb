import type { FunctionComponent } from 'react'
import type { ModalProps } from './modal.interface'
import clsx from 'clsx'
import { Stack, useMediaQuery, useTheme, Typography } from '@mui/material'
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledIconButton,
  BoxIcon,
} from './modal.styled'
import { SlClose } from 'react-icons/sl'

const Modal: FunctionComponent<ModalProps> = ({
  title,
  description,
  icon,
  direction,
  children,
  align,
  open,
  size,
  sizeModal,
  onClose,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      PaperProps={{
        sx: { width: sizeModal === 'large' ? 550 : 460, maxWidth: '100%' },
      }}
    >
      <StyledDialogTitle>
        <StyledIconButton
          aria-label="Fechar Modal"
          data-testid="close-button"
          onClick={onClose}
        >
          <SlClose />
        </StyledIconButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <Stack>
          <Stack direction={direction}>
            {icon && (
              <BoxIcon
                className={clsx(size)}
                sx={{ display: isMobile ? 'none' : 'flex' }}
              >
                {icon}
              </BoxIcon>
            )}
            <Stack direction="column" sx={{ width: '100%' }}>
              {title && (
                <Typography
                  variant="h6"
                  lineHeight="24px"
                  mb={1}
                  textAlign={align}
                >
                  {title}
                </Typography>
              )}

              {description && (
                <Typography
                  variant="body2"
                  color="#373737"
                  lineHeight="19px"
                  textAlign={align}
                >
                  {description}
                </Typography>
              )}
            </Stack>
          </Stack>

          {children}
        </Stack>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default Modal
