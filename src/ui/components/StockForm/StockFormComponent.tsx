import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IWatchedStock, STOCK_ELEMENTS, useStockStore } from '../../store';
import AddIcon from '@mui/icons-material/Add';

export type TStockForm = Pick<IWatchedStock, 'symbol' | 'alertPrice' | 'name'>;

export const StockFormComponent: React.FC = () => {
  const theme = useTheme();
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

  const addStock = useStockStore((state) => state.addStockToWatch);

  const onSubmit = (data: TStockForm) => {
    const { symbol, alertPrice } = data;

    if (!symbol) return;

    const name = STOCK_ELEMENTS.find(
      (element) => element.symbol === symbol,
    )!.name;

    addStock(symbol, alertPrice, name);

    reset({
      symbol: '',
      alertPrice: 0,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: theme.palette.background.paper }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Add Symbol to Watch list
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="symbol-select-label">
            Symbol (Stock / Cripto)
          </InputLabel>
          <Controller
            name="symbol"
            control={control}
            rules={{ required: 'A symbol must be selected' }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="symbol-select-label"
                label="Symbol (Stock / Cripto)"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: theme.palette.background.paper,

                      boxShadow: theme.shadows[6],
                      border: '1px solid ' + theme.palette.divider,
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em style={{ color: theme.palette.text.secondary }}>
                    Select a symbol
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
          <Typography variant="caption" color="error" sx={{ mb: 2 }}>
            {errors.symbol.message}
          </Typography>
        )}
        <Controller
          name="alertPrice"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Price Alert (Optional)"
              type="number"
              fullWidth
              size="small"
              helperText={fieldState.error?.message}
              error={!!fieldState.error}
              sx={{ mb: 3 }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
        >
          Subscribe
        </Button>
      </form>
    </Paper>
  );
};
