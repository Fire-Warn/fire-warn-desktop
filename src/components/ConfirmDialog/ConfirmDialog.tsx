import React, { useContext, useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import classNames from 'classnames';

import { ConfirmDialogProps } from '.';

import { ConfirmDialogContext } from './ConfirmDialog.context';
import {
  WTextField,
  CenteredContent,
  WTitle,
  WSubtitle,
  WDescription,
  WDialog,
  CloseIconButton,
  RowContent,
} from './ConfirmDialog.styles';

function ConfirmDialog({ ...rest }: ConfirmDialogProps) {
  const context = useContext(ConfirmDialogContext);

  const [opened, setOpened] = useState(context.opened);
  const [content, setContent] = useState(context.content);

  useEffect(
    () =>
      // returns unsubscribe
      context.subscribe(() => {
        setOpened(context.opened);
        setContent(context.content);
      }),
    [context],
  );

  const [inputText, setInputText] = useState('');
  useEffect(() => {
    if (content?.type === 'input' && content?.defaultValue) {
      setInputText(content?.defaultValue);
    } else {
      // reset input on open/close
      setInputText('');
    }
  }, [setInputText, content, opened]);

  useEffect(() => {
    if (content?.type === 'hide' && opened) {
      context.close(false);
    }
  }, [context, content, opened]);

  return (
    <WDialog
      open={opened}
      onClose={!content?.persistent ? () => context.close(false) : undefined}
      {...rest}
    >
      {!content?.persistent && (
        <CloseIconButton
          onClick={() => context.close(false)}
          autoFocus={content?.type === 'miniInfo'}
        >
          <CloseIcon />
        </CloseIconButton>
      )}
      {content?.type === 'miniInfo' && (
        <CenteredContent>
          <content.icon />
          <WTitle variant={'h5'} className={'no-padding'}>
            {content?.title}
          </WTitle>
        </CenteredContent>
      )}
      {content?.type === 'info' && (
        <>
          <RowContent
            className={
              content?.orientation && classNames({ [content?.orientation]: true })
            }
          >
            {content.icon && (
              <div>
                <content.icon
                  style={{ width: content.iconSize, height: content.iconSize }}
                />
              </div>
            )}
            <div
              className={'grow'}
              style={{
                textAlign: content?.orientation === 'column' ? 'center' : undefined,
              }}
            >
              {content?.bigTitle && (
                <WTitle
                  variant={'h4'}
                  className={classNames({ 'no-padding': content.noPadding })}
                >
                  {content?.bigTitle}
                </WTitle>
              )}
              {content?.title && (
                <WTitle
                  variant={'h5'}
                  className={classNames({ 'no-padding': content.noPadding })}
                >
                  {content?.title}
                </WTitle>
              )}
              {content?.subtitle && <WSubtitle>{content?.subtitle}</WSubtitle>}
              {content?.description && (
                <WDescription>{content?.description}</WDescription>
              )}
              {content?.CustomContent && <content.CustomContent />}
            </div>
          </RowContent>
          {(content?.cancelText || content?.confirmText) && (
            <DialogActions style={{ marginTop: '1rem' }}>
              {content?.cancelText && (
                <Button
                  variant={'outlined'}
                  color={'inherit'}
                  onClick={() => context.close(false)}
                >
                  {content?.cancelText}
                </Button>
              )}
              {content?.confirmText && (
                <Button
                  variant={'contained'}
                  autoFocus
                  onClick={() => context.close(true)}
                  color={content?.confirmColor}
                >
                  {content?.confirmText}
                </Button>
              )}
            </DialogActions>
          )}
        </>
      )}
      {content?.type === 'input' && (
        <>
          {content?.title && <WTitle variant={'h5'}>{content?.title}</WTitle>}
          <WTextField
            value={inputText}
            placeholder={content?.placeholder}
            onChange={(e: any) => setInputText(e.target.value)}
          />
          <DialogActions>
            <Button
              variant={'outlined'}
              color={'inherit'}
              onClick={() => context.close(false)}
            >
              {content?.cancelText || 'Cancel'}
            </Button>
            <Button
              variant={'contained'}
              onClick={() => context.close<string>(true, inputText)}
            >
              {content?.confirmText || 'Submit'}
            </Button>
          </DialogActions>
        </>
      )}
    </WDialog>
  );
}

export default ConfirmDialog;
