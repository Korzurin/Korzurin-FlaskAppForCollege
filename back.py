# %%
# Импортируем библиотеки для открытия датасета, две библиотеки для сравнения, и не забудте установить python-Levenshtein
import pandas as pd
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

# %%
# Открываем данные.
# df = pd.read_csv('link/links1.csv', encoding='utf-8')
# df

# # %%
# text = 'аттестация'
# # def arus(text):
    

# # %%
# # Сравниваем в каждой позиции заголовка, сам заголовок и запрос.
# sim_arr = []
# for i in range(df.shape[0]):
#     word = df['first'].iloc[i]
#     sim = fuzz.token_set_ratio(text,word)
#     sim_arr.append(sim)

# # %%
# # Мы создали массив, в котором содержится процент схожести хотябы отдного слова к датасету, а именно заголовков.
# sim_arr

# # %%
# sim_arr.index(max(sim_arr))

# # %%
# df['first'].loc[sim_arr.index(max(sim_arr))]

# %%
def GettingAndPosting(text):
    df = pd.read_csv('link/links1.csv', encoding='utf-8')
    sim_arr = []
    for i in range(df.shape[0]):
        word = df['first'].iloc[i]
        sim = fuzz.token_set_ratio(text,word)
        sim_arr.append(sim)
    sim_arr.index(max(sim_arr))
    return df['link'].loc[sim_arr.index(max(sim_arr))]

# %%
# some = GettingAndPosting('Аттестация')

# # %%
# some


# # %%




def GettingAndPosting1(text):
    df = pd.read_csv('link/final13.csv', encoding='utf-8')
    sim_arr = []
    hun_arr = []
    mid_arr = []
    for i in range(df.shape[0]):
        word = df['first'].iloc[i]
        sim = fuzz.token_set_ratio(text,word)
        sim_arr.append(sim)
    # sim_arr.index(max(sim_arr))
    for u in range(len(sim_arr)):
        if sim_arr[u] == 100:
            hun_arr.append(df['link'].loc[u])
        elif sim_arr[u] >= 80 and sim_arr[u] <= 99:
            mid_arr.append(df['link'].loc[sim_arr.index(max(sim_arr))])

    if len(hun_arr) != 0:
        return hun_arr
    elif len(mid_arr) != 0:
        return mid_arr
    else:
        return "Статья не найдена"
    # return df['link'].loc[sim_arr.index(max(sim_arr))]

