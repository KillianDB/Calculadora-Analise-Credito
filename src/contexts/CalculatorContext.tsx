import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface CalculatorContextType {
  parameters: Record<string, any>;
  loading: boolean;
}

interface CalculatorProviderProps {
  children: ReactNode;
}

interface Coeficiente {
  id: string;
  menu: string;
  submenu: string;
  value: {};
}

const CalculatorContext = createContext<CalculatorContextType>({
  parameters: {},
  loading: true,
});

export const CalculatorProvider = ({ children }: CalculatorProviderProps) => {
  const [parameters, setParameters] = useState<Coeficiente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Loading calculator parameters...");
    const loadParameters = async () => {
      try {
        const cached = localStorage.getItem("calculatorParams");
        console.log("Cached parameters => ", cached);
        if (cached) {
          setParameters(JSON.parse(cached));
        }

        const response = await fetch(
          "https://api.creditorealsf.com/coefficients/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Response status => ", response.status);
        const data = await response.json();
        console.log("Response data => ", data);

        const paramsMap = data.reduce((acc: any, param: any) => {
          console.log("Parameter => ", param);
          if (!acc[param.menu]) {
            acc[param.menu] = {};
          }

          // Armazena os valores do coeficiente sob o submenu
            acc[param.menu][param.submenu] = { id: param.id, values: param.value };

          return acc;
        }, {});

        setParameters(paramsMap);
        localStorage.setItem("calculatorParams", JSON.stringify(paramsMap));
        console.log("Parameters loaded successfully", paramsMap);
      } catch (error) {
        console.error("Parameter load failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadParameters();
  }, []);

  return (
    <CalculatorContext.Provider value={{ parameters, loading }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorParams = () => useContext(CalculatorContext);
