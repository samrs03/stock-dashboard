import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IWatchedStock, STOCK_ELEMENTS, store } from '../../store';
import AddIcon from '@mui/icons-material/Add';

export type TStockForm = Pick<IWatchedStock, 'symbol' | 'alertPrice' | 'name'>;

export const StockForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TStockForm>({
    defaultValues: {
      symbol: '',
      alertPrice: 0,
      name: '',
    },
  });

  const onSubmit = (data: TStockForm) => {
    const { symbol, alertPrice } = data;

    if (!symbol) return;

    const name = STOCK_ELEMENTS.find(
      (element) => element.symbol === symbol,
    )!.name;

    store.addStockToWatch(symbol, alertPrice, name);

    // should i reset ?

    reset({
      symbol: '',
      alertPrice: 0,
    });
  };

  return (
    <Paper elevation={3}>
      <Typography variant="h5">Añadir Activo a Watchlist</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth size="small">
          <InputLabel id="symbol-select-label">
            Símbolo (Stock / Cripto)
          </InputLabel>
          <Controller
            name="symbol"
            control={control}
            rules={{ required: 'Debe seleccionar un símbolo' }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="symbol-select-label"
                label="Símbolo (Stock / Cripto)"
                MenuProps={{ PaperProps: { sx: { bgcolor: 'rgb(31 41 55)' } } }}
              >
                <MenuItem value="" disabled>
                  <em style={{ color: 'rgb(156 163 175)' }}>
                    Seleccione un símbolo
                  </em>
                </MenuItem>
                {STOCK_ELEMENTS.map((s) => (
                  <MenuItem key={s.symbol} value={s.symbol}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        {errors.symbol && (
          <Typography variant="caption" color="error">
            {errors.symbol.message}
          </Typography>
        )}
        <Controller
          name="alertPrice"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Alerta de Precio (Opcional)"
              type="number"
              fullWidth
              size="small"
              helperText={fieldState.error?.message}
              error={!!fieldState.error}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
        >
          Suscribirse y Añadir
        </Button>
      </form>
    </Paper>
  );
};
